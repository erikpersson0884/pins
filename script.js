

var createButton = document.getElementById("createButton")
var selectImageInput = document.getElementById('selectImageInput');
var imageContainer = document.getElementById('imageContainer');
var previewImage = document.getElementById('previewImage');

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


selectImageInput.addEventListener("change", setImagePreview);

createButton.addEventListener("click", function(){
    window.print();
});

