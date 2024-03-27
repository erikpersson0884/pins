
const showHowToButton = document.getElementById('showHowToButton');

const howToShadowbox = document.getElementById('howToShadowbox');
const howToDiv = document.getElementById('howTo');

showHowToButton.addEventListener('click', function() {
    howToShadowbox.classList.toggle('hidden');
});

howToShadowbox.addEventListener('click', function(event) {
    howToShadowbox.classList.add('hidden');
});

howToDiv.addEventListener('click', function(event) {
    event.stopPropagation();
});
