// test access "calypsoData" sent to window from eleventy.js via "expose" shortcode
// console.log(calypsoData);
// let data = calypsoData;



// markdown-it in browser, added to "window" on script load
// const md = window.markdownit();
const md = window.markdownit({
    html: true,
    breaks: true,
});


// html elements
const filename1 = document.querySelector('#image-filename-1');
const image1 = document.querySelector('#image-1');
const caption1 = document.querySelector('#caption-1');
const dateSource1 = document.querySelector('#date-source-1');
const filename2 = document.querySelector('#image-filename-2');
const image2 = document.querySelector('#image-2');
const caption2 = document.querySelector('#caption-2');
const dateSource2 = document.querySelector('#date-source-2');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');
const sourceSelect = document.querySelector('#source-select');
const tagSelect = document.querySelector('#tag-select')

const views = [
    "book",
    "web",
];
const tags = [
    "alternative",
    "vs",
    "medium",
    "sunburn"
];
// to do : get array of tags 
// append options to tag select
tags.forEach( (tag,i) => {
    console.log(i,tag);
    let opt = document.createElement('option');
    opt.value = tag;
    opt.innerHTML = `Walk ${i+1}`;
    tagSelect.appendChild(opt);
});

// fetch data from json files
async function loadData(v) {
    const response = await fetch(`data/cc-${ views[v] }.json`);
    const data = await response.json();
    //console.log(data);
    return data;
}

  

function calcRatio(ratio) {
    let imageFormat = "";
    if ( ratio < 1 ) {
        imageFormat = "portrait"
    } else {
        imageFormat = "landscape"
    }
    return imageFormat;
}



document.addEventListener("DOMContentLoaded", async () => {
    try {
        let data = []
        let dataParsed = []
        let data1 = []
        let data2 = []
        let i = 0;
        let v = 0;
        let t = "";


        
        function parseData(){
            dataParsed = data.map(obj => {
                let rObj = {}
                rObj.id = obj.id
                if (obj.category != undefined){
                    rObj.category = obj.category
                } else if (obj.pagenumber != undefined) {
                    if (obj.pagenumber % 2 == 0 ){
                        rObj.category = 1
                    } else {
                        rObj.category = 2
                    }
                }   
                if (obj.image != undefined){
                    rObj.imageFilename = obj.imageFilename
                    // rObj.imageWidth = obj.image[0].width
                    // rObj.imageHeight = obj.image[0].height
                    // rObj.imageRatio = rObj.imageWidth / rObj.imageHeight
                    rObj.imageRatio = obj.image[0].width / obj.image[0].height
                } else {
                    rObj.image = []
                }
                if (obj.dateSource != undefined){
                    rObj.dateSource = obj.dateSource
                } else {
                    rObj.dateSource = ""
                }
                if (obj.caption != undefined){
                    // parse caption markdown
                    rObj.caption = md.render(`${obj.caption}`)
                } else {
                    rObj.caption = ""
                }   
                if (obj.tags == undefined){
                    rObj.tags = [""]
                } else {
                    rObj.tags = obj.tags
                }
                return rObj
            })
            //console.log("Data Parsed :");
            //console.log(dataParsed);
        }
        
        
        function filterCategories(){
            // filter data categories 1 / 2 
            data1 = dataParsed.filter(entry => entry.category == 1);
            data1All = data1; // backup for reset before filter
            //console.log("CALYPSO CAVE DATA 1");
            //console.log(data1);
            data2 = dataParsed.filter(entry => entry.category == 2);
            data2All = data2; 
            //console.log("CALYPSO CAVE DATA 2");
            //console.log(data2);
        }

        
        function setHtml(i) {
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

        async function setContent(i,v){
            data = await loadData(v);
            //console.log(`Data from view "${views[v]}" loaded:`);
            //console.log(data);
            parseData();
            filterCategories();
            setHtml(i);
        }
        setContent(i,v);
        

        // update on source select
        //console.log(sourceSelect.value)
        sourceSelect.addEventListener('change', async function setSource(event) {
             // get selected VALUE
            v = event.target.value;
            i = 0;
            console.log(v);
            setContent(i,v);
            
        });

        // filter by tag
        function filterTag(tag){
            data1 = data1All;
            data1 = data1.filter(entry => (entry.tags.includes(tag) == true ) );
            console.log(`Data1 filtered by tag "${tag}":`)
            console.log(data1);
            data2 = data2All;
            data2 = data2.filter(entry => (entry.tags.includes(tag) == true ) );
            console.log(`Data2 filtered by tag "${tag}":`);
            console.log(data2);  
        }

        tagSelect.addEventListener('change', async function setTag(event) {
            // get selected VALUE
           t = event.target.value;
           console.log(t);
           // re
           filterTag(t);
           setHtml(i);
       });

        // content navigation 
        
        function nextEntry(){
            if (i < data1.length-1){
                i++;
            } else {
                i = 0;
            }
            //console.log(i);
            setHtml(i);
        }
        function previousEntry(){
            if (i > 0){
                i--;
            } else {
                i = data1.length-1;
            }
            //console.log(i);
            setHtml(i);
        }
        
        nextButton.addEventListener('click', nextEntry);
        prevButton.addEventListener('click', previousEntry);
        
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

    }
    catch(e){
        console.log(e);
    }
});







