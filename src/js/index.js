
// console.log(calypsoData);
// filter data cat 1 / 2 
const data1 = calypsoData.filter(entry => entry.category == 1);
console.log("CALYPSO CAVE DATA 1");
console.log(data1);
const data2 = calypsoData.filter(entry => entry.category == 2);
console.log("CALYPSO CAVE DATA 2");
console.log(data2);

const filename1 = document.querySelector('#image-filename-1');
const image1 = document.querySelector('#image-1');
const caption1 = document.querySelector('#caption-1');
const dateSource1 = document.querySelector('#date-source-1');

const filename2 = document.querySelector('#image-filename-2');
const image2 = document.querySelector('#image-2');
const caption2 = document.querySelector('#caption-2');
const dateSource2 = document.querySelector('#date-source-2')


const nextButton = document.querySelector('#next-button');

let i = 0;

function setContent(i) {
    image1.src = `img/${data1[i].imageFilename}`;
    filename1.innerHTML = data1[i].imageFilename;
    // caption1.innerHTML = `<p>${data1[i].caption}</p>`;
    caption1.innerHTML = data1[i].caption;
    dateSource1.innerHTML = data1[i].dateSource;

    image2.src = `img/${data2[i].imageFilename}`;
    filename2.innerHTML = data2[i].imageFilename;
    caption2.innerHTML = data2[i].caption;
    dateSource2.innerHTML = data2[i].dateSource;
}

setContent(i);




// page content navigation 

function nextEntry(){
    i++;
    setContent(i);
}

nextButton.addEventListener('click', nextEntry);

// arrow key presses
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            //console.log('left');
            break;
        case 38:
            //console.log('up');
            break;
        case 39:
            //console.log('right');
            nextEntry();
            break;
        case 40:
            //console.log('down');
            break;
    }
});

