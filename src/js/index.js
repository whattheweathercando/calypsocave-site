//console.log(calypsoData);

// markdown-it in browser, added to "window" on script load
// const md = window.markdownit();
const md = window.markdownit({
    html: true,
    breaks: true,
});
// var result = md.render('# markdown-it rulezz!');

const dataParsed = calypsoData.map(obj => {
    let rObj = {}
    // todo : better way to pass key/value pairs unchanged
    rObj.id = obj.id
    rObj.category = obj.category
    rObj.imageFilename = obj.imageFilename
    // rObj.imageWidth = obj.image[0].width
    // rObj.imageHeight = obj.image[0].height
    // rObj.imageRatio = rObj.imageWidth / rObj.imageHeight
    rObj.imageRatio = obj.image[0].width / obj.image[0].height
    rObj.dateSource = obj.dateSource
    // parse caption markdown
    rObj.caption = md.render(`${obj.caption}`)
    return rObj
})
//console.log(dataParsed);



// filter data cat 1 / 2 
const data1 = dataParsed.filter(entry => entry.category == 1);
//console.log("CALYPSO CAVE DATA 1");
console.log(data1);
const data2 = dataParsed.filter(entry => entry.category == 2);
//console.log("CALYPSO CAVE DATA 2");
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

function calcRatio(ratio) {
    let imageFormat = "";
    if ( ratio < 1 ) {
        imageFormat = "portrait"
    } else {
        imageFormat = "landscape"
    }
    return imageFormat;
}

function setContent(i) {
    let imageRatio1 = calcRatio(data1[i].imageRatio);
    image1.classList.remove('portrait', 'landscape');
    image1.classList.add(imageRatio1);
    image1.src = `img/${data1[i].imageFilename}`;
    filename1.innerHTML = data1[i].imageFilename;
    // caption1.innerHTML = `<p>${data1[i].caption}</p>`;
    caption1.innerHTML = data1[i].caption;
    dateSource1.innerHTML = data1[i].dateSource;

    let imageRatio2 = calcRatio(data2[i].imageRatio);
    image2.classList.remove('portrait', 'landscape');
    image2.classList.add(imageRatio2)
    image2.src = `img/${data2[i].imageFilename}`;
    filename2.innerHTML = data2[i].imageFilename;
    caption2.innerHTML = data2[i].caption;
    dateSource2.innerHTML = data2[i].dateSource;
}

setContent(i);




// page content navigation 

function nextEntry(){
    if (i < data1.length-1){
        i++;
    } else {
        i = 0;
    }
    //console.log(i);
    setContent(i);
}
function previousEntry(){
    if (i > 0){
        i--;
    } else {
        i = data1.length-1;
    }
    console.log(i);
    setContent(i);
}

nextButton.addEventListener('click', nextEntry);

// arrow key presses
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            //console.log('left');
            previousEntry();
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

