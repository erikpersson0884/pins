var userLanguage = navigator.language || navigator.userLanguage;

var generateTemplateButton = document.getElementById("generateTemplateButton")
var selectImageInput = document.getElementById('selectImageInput');
var imageContainer = document.getElementById('imageContainer');
var previewImage = document.getElementById('previewImage');
var imageNotSquareWarningDialog = document.getElementById('imageNotSquareWarning');
var selectImageButton = document.getElementById('selectImageButton');
var fileName = document.getElementById('fileName');


function uploadedImageChanged() {
    if (!imageIsSquare()) {
        warnImageIsNotSquare();
    }
    changeFileName();
    setImagePreview();
};

function changeFileName() {
    var fileName = selectImageInput.files[0].name;
    document.getElementById('fileName').innerHTML = fileName;
};

function warnImageIsNotSquare() {
    imageNotSquareWarningDialog.classList.remove('hidden');

    setTimeout(function() {
        imageNotSquareWarningDialog.classList.add('hidden');
    }, 2000);
};



function imageIsSquare() {
    if (selectImageInput.files.length > 0) {
        var image = new Image();
        image.src = URL.createObjectURL(selectImageInput.files[0]);

        image.onload = function() {
            var width = this.width;
            var height = this.height;

            if (width === height) {
                console.log("true");

                return true;
            } else {
                console.log("false");

                return false;
            }
        };
    }
}

function setImagePreview() {
    if (selectImageInput.files.length > 0) {
        var imageUrl = URL.createObjectURL(selectImageInput.files[0]);
        previewImage.src = imageUrl;
        createImageGrid(); // has to be here. if placed before print, the grid will not load in time for print

        // previewImage.style.border = "1px solid #ddd";

    }
}



function createImageGrid() {
    imageContainer.innerHTML = ""; // Clear the image container


    // Ensure an image is selected
    if (imageIsUploaded()) {
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
                console.log("Image added");
            }
            imageContainer.appendChild(imgRow);
        };

    };
};

function imageIsUploaded(){
    if (selectImageInput.files.length > 0) {
        return true;
    } else {
        return false;
    }
}




selectImageButton.addEventListener("click", function () {
    selectImageInput.click();
});

selectImageInput.addEventListener("change", uploadedImageChanged);


generateTemplateButton.addEventListener("click", function(){
    if (true){
        window.print();
    } else {
        alert("Please upload an image first.");}
});


