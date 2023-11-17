// Function to duplicate the image 6 times with 4 images in each row
var inputDiv = document.getElementById("inputDiv");
var populateButton = document.getElementById("populateButton")


function duplicateImage() {
    var imageInput = document.getElementById('imageInput');
    var imageContainer = document.getElementById('imageContainer');

    // Ensure an image is selected
    if (imageInput.files.length > 0) {
        var imageUrl = URL.createObjectURL(imageInput.files[0]);

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



populateButton.addEventListener("click", duplicateImage);

