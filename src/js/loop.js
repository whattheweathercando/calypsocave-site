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
const cave1 = document.querySelector('#cave-1');
const image1 = document.querySelector('#image-1');
const caption1 = document.querySelector('#caption-1');
const dateSource1 = document.querySelector('#date-source-1');
const filename2 = document.querySelector('#image-filename-2');
const cave2 = document.querySelector('#cave-2');
const image2 = document.querySelector('#image-2');
const caption2 = document.querySelector('#caption-2');
const dateSource2 = document.querySelector('#date-source-2');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');
const sourceSelect = document.querySelector('#source-select');
const tagSelect = document.querySelector('#tag-select');
const navToggle = document.querySelector('#nav-toggle');
const nav = document.querySelector('#nav');
const select = document.querySelector('#select');

const views = [
    "book",
    "web",
    "key",
    "screenwalk",
];
const tags = [
    "-><-",
    "? ∞ ?",
    "#",
    "key",
    "$",
    "- -",
    "Odyssey",
    "->",
    "<-",
    "[  ]",
    "Walk"
];

// append options to tag select
tags.forEach( (tag,i) => {
    //console.log(i,tag);
    let opt = document.createElement('option');
    opt.value = tag;
    opt.innerHTML = `${i} - ${tag}`;
    tagSelect.appendChild(opt);
});

// fetch data from json files
async function loadData(v) {
    const response = await fetch(`/data/cc-${ views[v] }.json`);
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



document.addEventListener("DOMContentLoaded", () => {
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
                    // rObj.imageFilename = obj.imageFilename
                    rObj.imageFilename = obj.image[0].filename;
                    // rObj.imageWidth = obj.image[0].width
                    // rObj.imageHeight = obj.image[0].height
                    // rObj.imageRatio = rObj.imageWidth / rObj.imageHeight
                    rObj.imageRatio = obj.image[0].width / obj.image[0].height
                } else {
                    rObj.image = []
                    rObj.imageFilename = "";
                    rObj.imageRatio = 1;
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
            console.log("CALYPSO CAVE DATA 1");
            console.log(data1);
            data2 = dataParsed.filter(entry => entry.category == 2);
            data2All = data2; 
            console.log("CALYPSO CAVE DATA 2");
            console.log(data2);
        }

        function setHtmlX(i) {
            let cat = dataParsed[i].category;

            if (cat == 1){
                if (dataParsed[i].imageFilename != ""){
                    image1.src = `/img/${dataParsed[i].imageFilename}`;
                    filename1.innerHTML = dataParsed[i].imageFilename;
                    let imageRatio1 = calcRatio(dataParsed[i].imageRatio);
                    image1.classList.remove('portrait', 'landscape');
                    image1.classList.add(imageRatio1);
                } 
                caption1.innerHTML = dataParsed[i].caption;
                dateSource1.innerHTML = dataParsed[i].dateSource;
                cave2.classList.add('invisible');
                cave1.classList.remove('invisible');
            } else if (cat == 2){
                if (dataParsed[i].imageFilename != ""){
                    image2.src = `/img/${dataParsed[i].imageFilename}`;
                    filename2.innerHTML = dataParsed[i].imageFilename;
                    let imageRatio2 = calcRatio(dataParsed[i].imageRatio);
                    image2.classList.remove('portrait', 'landscape');
                    image2.classList.add(imageRatio2);
                }
                caption2.innerHTML = dataParsed[i].caption;
                dateSource2.innerHTML = dataParsed[i].dateSource;
                cave1.classList.add('invisible');
                cave2.classList.remove('invisible');
            }
        }
     

        function setHtml(i) {
            if (data1[i].imageFilename != ""){
                let imageRatio1 = calcRatio(data1[i].imageRatio);
                image1.classList.remove('portrait', 'landscape');
                image1.classList.add(imageRatio1);
                image1.src = `/img/${data1[i].imageFilename}`;
                filename1.innerHTML = data1[i].imageFilename;
            }   
            caption1.innerHTML = data1[i].caption;
            dateSource1.innerHTML = data1[i].dateSource;
        
            if (data2[i].imageFilename != ""){
                let imageRatio2 = calcRatio(data2[i].imageRatio);
                image2.classList.remove('portrait', 'landscape');
                image2.classList.add(imageRatio2)
                image2.src = `/img/${data2[i].imageFilename}`;
                filename2.innerHTML = data2[i].imageFilename;
            }
            caption2.innerHTML = data2[i].caption;
            dateSource2.innerHTML = data2[i].dateSource;
        }
        function setHtml1(i){
            if (data1[i].imageFilename != ""){
                let imageRatio1 = calcRatio(data1[i].imageRatio);
                image1.classList.remove('portrait', 'landscape');
                image1.classList.add(imageRatio1);
                image1.src = `/img/${data1[i].imageFilename}`;
                filename1.innerHTML = data1[i].imageFilename;
            }
            caption1.innerHTML = data1[i].caption;
            dateSource1.innerHTML = data1[i].dateSource;
        }
        function setHtml2(i){
            if (data2[i].imageFilename != ""){
                let imageRatio2 = calcRatio(data2[i].imageRatio);
                image2.classList.remove('portrait', 'landscape');
                image2.classList.add(imageRatio2)
                image2.src = `/img/${data2[i].imageFilename}`;
                filename2.innerHTML = data2[i].imageFilename;
            }
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
            //console.log(v);
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
            i = 0;
            // get selected VALUE
            t = event.target.value;
            console.log(t);
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
            // setHtml(i);
            setHtmlX(i);
        }
        function previousEntry(){
            if (i > 0){
                i--;
            } else {
                i = data1.length-1;
            }
            //console.log(i);
            // setHtml(i);
            setHtmlX(i);
        }
        function nextEntry1(){
            if (i < data1.length-1){
                i++;
            } else {
                i = 0;
            }
            setHtml1(i);
        }
        function previousEntry1(){
            if (i > 0){
                i--;
            } else {
                i = data1.length-1;
            }
            setHtml1(i);
        }
        function nextEntry2(){
            if (i < data1.length-1){
                i++;
            } else {
                i = 0;
            }
            setHtml2(i);
        }
        function previousEntry2(){
            if (i > 0){
                i--;
            } else {
                i = data1.length-1;
            }
            setHtml2(i);
        }
        
        navToggle.addEventListener('click', function(){
            nav.classList.toggle('hidden');
            select.classList.toggle('hidden');
        });
        nextButton.addEventListener('click', nextEntry);
        prevButton.addEventListener('click', previousEntry);
        
        // arrow key presses
        document.addEventListener('keydown', function(e) {

            if (e.shiftKey){
                switch (e.keyCode) {
                    case 37:
                        //console.log('left');
                        previousEntry1();
                        break;
                    case 39:
                        //console.log('right');
                        nextEntry1();
                        break;
                    case 38:
                        //console.log('up');
                        previousEntry2();
                        break;
                    case 40:
                        //console.log('down');
                        nextEntry2();
                        break;
                }
            } else {
                switch (e.keyCode) {
                    case 37:
                        //console.log('left');
                        previousEntry();
                        break;
                    case 39:
                        //console.log('right');
                        nextEntry();
                        break;
                }
            }

        });

    }
    catch(e){
        console.log(e);
    }
});







