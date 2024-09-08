// mainContent
    // Preview Image Side
    const imageNotSquareWarningDialog = document.getElementById('imageNotSquareWarning');
    const previewImage = document.getElementById('previewImage');
    const selectImageButton = document.getElementById('selectImageButton');
    const fileName = document.getElementById('fileName');
    const selectImageInput = document.getElementById('selectImageInput');

    /// Options Side
    const createPaddingCheckbox = document.getElementById('createPaddingCheckbox');
    const IncludePinBackgroundCheckbox = document.getElementById('pinBackground');
    const pinColorPickerOption = document.getElementById('pinColorPickerOption');
    const pinColorText = document.getElementById('pinColorText');
    const pinColorInput = document.getElementById('pinColorInput');

    const generateTemplateButton = document.getElementById("generateTemplateButton")

// image Grid 
const imageContainer = document.getElementById('imageContainer');

// Set default values

if (localStorage.getItem("includePinPadding")) {
    createPaddingCheckbox.checked = localStorage.getItem("includePinPadding")
}

if (localStorage.getItem("includePinBackground") && localStorage.getItem("includePinBackground") === "true") {
    IncludePinBackgroundCheckbox.checked = (localStorage.getItem("includePinBackground"));
    setIncludePinBackground(true);
}

if (localStorage.getItem("pinBackground")) {
    setPrintBackgroundColor(localStorage.getItem("pinBackground"));
}



// Add event listeners 

previewImage.addEventListener("click", function () {
    selectImageInput.click();
});

selectImageButton.addEventListener("click", function () {
    selectImageInput.click();
});

selectImageInput.addEventListener("change", uploadedImageChanged);


createPaddingCheckbox.addEventListener('change', () => {
    localStorage.setItem("includePinPadding", createPaddingCheckbox.checked);
});

IncludePinBackgroundCheckbox.addEventListener('change', function(){
    setIncludePinBackground(IncludePinBackgroundCheckbox.checked);
});

pinColorText.addEventListener('click', () =>{
    pinColorInput.click();
});

pinColorInput.addEventListener('input', () =>{
    setPrintBackgroundColor(pinColorInput.value);
});

generateTemplateButton.addEventListener("click", function(){
    if (isImageUploaded()) window.print();
    else alert("Please upload an image first.");
});

// Unspecific functions

function showWarning(message){
    imageNotSquareWarningDialog.querySelector('p').innerHTML = message;
    imageNotSquareWarningDialog.style.top = "0";
}

function disableWarning() {
    imageNotSquareWarningDialog.style.top = "-3rem";
}


// Funcitons

function createImageGrid() {
    imageContainer.innerHTML = "";

    if (isImageUploaded()) throw new Error("No image uploaded");

    const imageUrl = URL.createObjectURL(selectImageInput.files[0]);
    for (let row = 0; row < 6; row++) {
        const imgRow = document.createElement("div");
        imgRow.classList.add("imageRow");

        for (let col = 0; col < 4; col++) {
            const imgElement = `
            <img src="${imageUrl}" 
                alt="Duplicated Image" 
                class = "pinImage ${createPaddingCheckbox.checked ? 'pinImageWithPadding' : ''} ${IncludePinBackgroundCheckbox.checked ? 'pinImageWithBackground' : ''}"
            />`;

            imgRow.innerHTML += imgElement;
            
        }
        imageContainer.appendChild(imgRow);
    };
};

function uploadedImageChanged() {
    changeFileName();
    previewImage.src = URL.createObjectURL(selectImageInput.files[0])
    createImageGrid(); // has to be here. if placed before print, the grid will not load in time for print

    setTimeout(warnImageIsNotSquare, 100);
};



function isImageUploaded(){
    if (selectImageInput.files.length > 0)return true;
    return false;
}

function warnImageIsNotSquare() {
    if (previewImage.naturalWidth === previewImage.naturalHeight) { // checks if image is square
        disableWarning();
    } else{
        showWarning("Image is not square");
    }
};

function changeFileName() {
    const fileName = selectImageInput.files[0].name;
    fileName.innerHTML = fileName;
};


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

function setPrintBackgroundColor(color) {
    document.body.style.setProperty('--printBackgroundColor', color);
    pinColorText.innerHTML = color;
    localStorage.setItem("pinBackground", color);
}