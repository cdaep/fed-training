const shareBtn = document.querySelector(".share-btn");
const hiddenShareBtn = document.querySelector(".hidden-share-btn");
const shareSection = document.querySelector(".share-section");
const facebook = document.querySelector(".facebook");
const twitter = document.querySelector(".twitter");
const pinterest = document.querySelector(".pinterest");

const toggleSection = () => shareSection.classList.toggle("shown");


shareBtn.addEventListener("click", function() {
    toggleSection();
});

hiddenShareBtn.addEventListener("click", function () {
    toggleSection();
});

facebook.addEventListener("click", function () {
    openInNewTab('https://facebook.com')
});

twitter.addEventListener("click", function () {
    openInNewTab('https://x.com')
});

pinterest.addEventListener("click", function () {
    openInNewTab('https://www.pinterest.com')
});

function openInNewTab(url) {
     window.open(url, '_blank');
}