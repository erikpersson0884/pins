
var generateTemplateButton = document.getElementById("generateTemplateButton")
var selectImageInput = document.getElementById('selectImageInput');
var imageContainer = document.getElementById('imageContainer');
var previewImage = document.getElementById('previewImage');
var imageNotSquareWarningDialog = document.getElementById('imageNotSquareWarning');
var selectImageButton = document.getElementById('selectImageButton');
var fileName = document.getElementById('fileName');
var uglyDuckling = document.getElementById('uglyDuckling');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



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
            }
            imageContainer.appendChild(imgRow);
        };

    };
};

function uploadedImageChanged() {
    changeFileName();
    setImagePreview();

    setTimeout(warnImageIsNotSquare, 100);
};

function changeFileName() {
    var fileName = selectImageInput.files[0].name;
    document.getElementById('fileName').innerHTML = fileName;
};

function warnImageIsNotSquare() {
    if (imageIsSquare()) {
        console.log("image is square");
        disableWarning();
    } else{
        console.log("image is not square");
        showWarning("Image is not square");
    }
};

function showWarning(message){
    imageNotSquareWarningDialog.querySelector('p').innerHTML = message;
    imageNotSquareWarningDialog.classList.remove('hidden');

}

function disableWarning() {
    imageNotSquareWarningDialog.classList.add('hidden');
}


function imageIsSquare() {
    var image = previewImage;
    console.log(image.naturalWidth + " " + image.naturalHeight);

    if (image.naturalWidth === image.naturalHeight) {
        console.log("true");
        return true;
    }
    return false;
}

function setImagePreview() {
    if (selectImageInput.files.length > 0) {
        var imageUrl = URL.createObjectURL(selectImageInput.files[0]);
        previewImage.src = imageUrl

        createImageGrid(); // has to be here. if placed before print, the grid will not load in time for print
    }
}




function imageIsUploaded(){
    if (selectImageInput.files.length > 0) {
        return true;
    } 
    console.log("FILE NOT UPLOADED");
    return false;
}

function checkIfSquare(width, height) {
    return width === height;
}



selectImageButton.addEventListener("click", function () {
    selectImageInput.click();
});

previewImage.addEventListener("click", function () {
    selectImageInput.click();
});

selectImageInput.addEventListener("change", uploadedImageChanged);


generateTemplateButton.addEventListener("click", function(){
    if (imageIsUploaded()){
        window.print();
    } else {
        alert("Please upload an image first.");}
});


