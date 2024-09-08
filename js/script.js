
const generateTemplateButton = document.getElementById("generateTemplateButton")
const selectImageInput = document.getElementById('selectImageInput');
const imageContainer = document.getElementById('imageContainer');
const previewImage = document.getElementById('previewImage');
const imageNotSquareWarningDialog = document.getElementById('imageNotSquareWarning');
const selectImageButton = document.getElementById('selectImageButton');
const fileName = document.getElementById('fileName');
const createPaddingCheckbox = document.getElementById('createPaddingCheckbox');
const IncludePinBackgroundCheckbox = document.getElementById('pinBackground');
const pinColorPickerOption = document.getElementById('pinColorPickerOption');


const pinColorText = document.getElementById('pinColorText');
const pinColor = document.getElementById('pinColor');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

if (localStorage.getItem("includePinPadding")) {
    createPaddingCheckbox.checked = localStorage.getItem("includePinPadding")
}
createPaddingCheckbox.addEventListener('change', () => {
    localStorage.setItem("includePinPadding", createPaddingCheckbox.checked);
});

if (localStorage.getItem("pinBackground")) {
    setPrintBackgroundColor(localStorage.getItem("pinBackground"));
}


if (localStorage.getItem("includePinBackground") && localStorage.getItem("includePinBackground") === "true") {
    IncludePinBackgroundCheckbox.checked = (localStorage.getItem("includePinBackground"));
    pinColorPickerOption.classList.remove('disabled');
}


function createImageGrid() {
    imageContainer.innerHTML = "";

    if (isImageUploaded()) {
        const imageUrl = URL.createObjectURL(selectImageInput.files[0]);

        // Create the grid of images
        for (let row = 0; row < 6; row++) {
            const imgRow = document.createElement("div");
            imgRow.classList.add("imageRow");

            for (let col = 0; col < 4; col++) {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Duplicated Image';
                imgElement.classList = ['pinImage'];

                if (createPaddingCheckbox.checked) {
                    imgElement.classList.add('pinImageWithPadding');
                }
                if (IncludePinBackgroundCheckbox.checked) {
                    imgElement.classList.add('pinImageWithBackground');
                }
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
    const fileName = selectImageInput.files[0].name;
    document.getElementById('fileName').innerHTML = fileName;
};

function warnImageIsNotSquare() {
    if (imageIsSquare()) {
        disableWarning();
    } else{
        showWarning("Image is not square");
    }
};

function showWarning(message){
    imageNotSquareWarningDialog.querySelector('p').innerHTML = message;
    imageNotSquareWarningDialog.style.top = "0";

}

function disableWarning() {
    imageNotSquareWarningDialog.style.top = "-3rem";
}


function imageIsSquare() {
    const image = previewImage;

    if (image.naturalWidth === image.naturalHeight) {
        return true;
    }
    return false;
}

function setImagePreview() {
    if (selectImageInput.files.length > 0) {
        const imageUrl = URL.createObjectURL(selectImageInput.files[0]);
        previewImage.src = imageUrl

        createImageGrid(); // has to be here. if placed before print, the grid will not load in time for print
    }
}

function setPrintBackgroundColor(color) {
    document.body.style.setProperty('--printBackgroundColor', color);
    localStorage.setItem("pinBackground", color);
    pinColorText.innerHTML = color;
}

function isImageUploaded(){
    if (selectImageInput.files.length > 0) {
        return true;
    } 
    return false;
}

selectImageButton.addEventListener("click", function () {
    selectImageInput.click();
});

previewImage.addEventListener("click", function () {
    selectImageInput.click();
});

selectImageInput.addEventListener("change", uploadedImageChanged);


generateTemplateButton.addEventListener("click", function(){
    if (isImageUploaded()){
        window.print();
    } else {
        alert("Please upload an image first.");}
});





IncludePinBackgroundCheckbox.addEventListener('change', function(){
    setIncludePinBackground(IncludePinBackgroundCheckbox.checked);
});

function setIncludePinBackground(input){
    if (input){
        pinColorPickerOption.classList.remove('disabled');
        previewImage.classList.add('pinImageWithBackground');
        
        localStorage.setItem("includePinBackground", true);
    } else {
        pinColorPickerOption.classList.add('disabled');
        previewImage.classList.remove('pinImageWithBackground');
        localStorage.setItem("includePinBackground", false);
    }
}

pinColorText.addEventListener('click', () =>{
    pinColor.click();
});

pinColor.addEventListener('input', () =>{
    setPrintBackgroundColor(pinColor.value);
});



createPaddingCheckbox.addEventListener('change', function(){
    if (createPaddingCheckbox.checked){
        document.body.classList.add('padding');
    } else {
        document.body.classList.remove('padding');
    }
});