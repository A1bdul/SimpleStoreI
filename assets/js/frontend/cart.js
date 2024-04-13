// jQuery(function($) {
// $(document).ready(function() {
//     $('body').on('click', 'a', function(event) {
//         event.preventDefault();
//         var href = $(this).attr('href');
//         console.log('Link clicked: ' + href);
//       })
//     $('body').on('DOMSubtreeModified', function() {
//         let originalFormData = $(".woocommerce-cart-form").serialize(); 
//         function isFormChanged() {
//             var currentFormData = $(".woocommerce-cart-form").serialize();
//             return currentFormData !== originalFormData;
//         }

//         if (isFormChanged()) {
//             $(".woocommerce-cart-form button[name='update_cart']").prop("disabled", false).removeClass("disable");
//         } else {
//             $(".woocommerce-cart-form button[name='update_cart']").prop("disabled", true).addClass("disable");
//     }
//       });
// });
// });

// function handleCartForm($) {
//     console.log("aT LEAST I works")
//     var originalFormData = $(".woocommerce-cart-form").serialize(); // Get the original form data on page load

//     function isFormChanged() {
//         var currentFormData = $(".woocommerce-cart-form").serialize();
//         return currentFormData !== originalFormData;
//     }
    

//     function handleFormChanges() {
//         if (isFormChanged()) {
//             $(".woocommerce-cart-form button[name='update_cart']")
//                 .prop("disabled", false)
//                 .removeClass("disable");
//         } else {
//             $(".woocommerce-cart-form button[name='update_cart']")
//                 .prop("disabled", true)
//                 .addClass("disable");
//         }
//     }

//     $(document).ready(function () {
//         // Initial handling of form changes
//         console.log("ex 1")
//         handleFormChanges();

//         // Listen to changes in the form and handle them
//         $(".woocommerce-cart-form").on("change", function () {
//             console.log("hell is chnaged");
//             handleFormChanges();
//         });
//     });
// }

// // Call the function
// handleCartForm(jQuery);

// // function handleCartForm($) {
// //     var originalFormData = $(".woocommerce-cart-form").serialize(); // Get the original form data on page load

// //     function isFormChanged() {
// //         var currentFormData = $(".woocommerce-cart-form").serialize();
// //         return currentFormData !== originalFormData;
// //     }

// //     function handleFormChanges() {
// //         if (isFormChanged()) {
// //             $(".woocommerce-cart-form button[name='update_cart']")
// //                 .prop("disabled", false)
// //                 .removeClass("disable");
// //         } else {
// //             $(".woocommerce-cart-form button[name='update_cart']")
// //                 .prop("disabled", true)
// //                 .addClass("disable");
// //         }
// //     }

// //     $(document).ready(function () {
// //         // Initial handling of form changes
// //         handleFormChanges();

// //         // Listen to changes in the form and handle them
// //         $(".woocommerce-cart-form input, .woocommerce-cart-form select").on("change", function () {
// //             handleFormChanges();
// //         });

// //         // Perform an AJAX request on link click and log the success or error output
// //         $("a").on("click", function (event) {
// //             event.preventDefault();
// //             var href = $(this).attr("href");
// //             $.ajax({
// //                 url: href,
// //                 method: "GET",
// //                 success: function (data) {
// //                     console.log("AJAX request to " + href + " was successful. Response: ", data);
// //                 },
// //                 error: function (jqXHR, textStatus, errorThrown) {
// //                     console.error("AJAX request to " + href + " failed: " + errorThrown);
// //                 }
// //             });
// //         });
// //     });
// // }

// // // Call the function
// // handleCartForm(jQuery);

