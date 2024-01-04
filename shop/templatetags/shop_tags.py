from django import template
from PIL import Image
from io import BytesIO
import base64
import tempfile
import os
import requests

register = template.Library()

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
