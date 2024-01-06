from django import template
from PIL import Image
from io import BytesIO
import base64
import tempfile
import re
import os
import requests
from django.template.defaultfilters import stringfilter
from urllib.parse import urlencode, parse_qs

register = template.Library()

def check_exact_word(input_string, word_to_check):
    pattern = r'\b' + re.escape(word_to_check) + r'\b'  # Construct the regular expression pattern

    match = re.search(pattern, input_string)  # Use re.search to find the exact word

    if match:
        return True  # If there's a match, the exact word is present in the input string
    else:
        return False  # If there's no match, the exact word is not present in the input string

def remove_word_from_string(input_string, word_to_remove):
    # Construct the regular expression pattern to match the exact word with word boundaries
    pattern = r'\b' + re.escape(word_to_remove) + r'\b'

    # Use re.sub to remove the matched word while preserving other occurrences
    result = re.sub(pattern, '', input_string)

    return result

@register.simple_tag
def update_url(request, param_name=None, param_value=None, *args, **kwargs):
    """
        using the template tag to update the query parameters in the url.

        {% update_url request 'filter_size' 'extra-large' %}
    """
    updated_params = request.GET.copy()
    current_values = updated_params.get(param_name, None)  # Get the current value or an empty list

    if param_name and param_value:
        if current_values:
            # If the parameter already has a value
            current_values = current_values.split(",")
            if param_value in current_values:
                current_values.remove(param_value)
            else:
                current_values.append(param_value)
            updated_params[param_name] = ",".join([str(ele) for ele in current_values])
        else:  # If the parameter has no value yet
            updated_params[param_name] = param_value

    updated_params["query_type_size"] = "or"

    for key in kwargs:
        updated_params[key] = kwargs[key]
    # Convert the updated query parameters back to a URL string
    updated_url = '{}?{}'.format(request.path, urlencode(updated_params, doseq=True))


    return updated_url

@register.simple_tag
def base64_encode(image_url):
    encoded_image = base64.b64encode(requests.get(image_url).content).decode('utf-8')
    return f"data:image/jpeg;base4,{encoded_image}"

    # try:
    #     if image_url.startswith(('http://', 'https://')):
    #         response = requests.get(image_url)
    #         image = Image.open(BytesIO(response.content))
    #         # image = image.convert('RGB')
    #         # image.save("g.jpg")
    #     else:
    #         image = Image.open(image_url)
    #
    #     if size:
    #         # Assuming size is in the format "300x400"
    #         width, height = [int(x) for x in size.split('x')]
    #         image = image.resize((width, height))
    #     # If size is not provided, use the original size of the image
    #     else:
    #         width, height = image.size
    #
    #     # Create a temporary file to save the image
    #     with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as temp_file:
    #         image.save(temp_file, format='JPEG')  # Save the resized image to the temporary file
    #         temp_file.seek(0)
    #         encoded_image = base64.b64encode(temp_file.read()).decode('utf-8')
    #
    #     # Delete the temporary file
    #     # os.unlink(temp_file.name)
    #     print(f"data:image/jpeg;base4,{encoded_image}")
    #     return f"data:image/jpeg;base4,{encoded_image}"
    # except Exception as e:
    #     # Handle any potential errors, such as invalid image URLs or incorrect size format
    #     print(f"An error occurred: {e}")  # You may want to log the error or handle it in a different way
    #     return ""
