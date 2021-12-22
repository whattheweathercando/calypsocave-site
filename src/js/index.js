
console.log(calypsoData);

const filename = document.querySelector('#image-filename');
const image = document.querySelector('#image');
const caption = document.querySelector('#caption');
const nextButton = document.querySelector('#next-button');

let i = 10;

function setContent(i) {
    image.src = `img/${calypsoData[i].imageFilename}`;
    filename.innerHTML = calypsoData[i].imageFilename;
    caption.innerHTML = calypsoData[i].caption;
}

setContent(i);

function nextEntry(){
    i++;
    setContent(i);
}

nextButton.addEventListener('click', nextEntry);

