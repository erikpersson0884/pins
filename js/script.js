var userLanguage = navigator.language || navigator.userLanguage;

var createButton = document.getElementById("createButton")
var selectImageInput = document.getElementById('selectImageInput');
var imageContainer = document.getElementById('imageContainer');
var previewImage = document.getElementById('previewImage');

function setPageLanguage() {
    // if (userLanguage == "")
            // Log browser language preference
            console.log('Browser Language:', navigator.language || navigator.userLanguage);

            // Log user agent information
            console.log('User Agent:', navigator.userAgent);

            // Log operating system language preference
            console.log('OS Language:', navigator.languages);

            // Log input element's language attribute
            var inputElement = document.getElementById('selectImageInput');
            console.log('Input Element Language:', inputElement.getAttribute('lang'));

            // Log document language
            console.log('Document Language:', document.documentElement.lang);
}

function setImagePreview() {
    if (selectImageInput.files.length > 0) {
        var imageUrl = URL.createObjectURL(selectImageInput.files[0]);
        previewImage.src = imageUrl;

        // previewImage.style.border = "1px solid #ddd";

        createImageGrid();
    }
}



function createImageGrid() {
    imageContainer.innerHTML = ""; // Clear the image container


    // Ensure an image is selected
    if (selectImageInput.files.length > 0) {
        var imageUrl = URL.createObjectURL(selectImageInput.files[0]);

        // Create the grid of images
        for (var row = 0; row < 6; row++) {
            var imgRow = document.createElement("div");
            imgRow.classList.add("imageRow");

            for (var col = 0; col < 4; col++) {
                var imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Duplicated Image';
                imgElement.classList.add('pinImage');
                imgRow.appendChild(imgElement);
            }
            imageContainer.appendChild(imgRow);
        }

    } else {
        alert('Please select an image first.');
    }
}

setPageLanguage();

selectImageInput.addEventListener("change", setImagePreview);

createButton.addEventListener("click", function(){
    window.print();
});

