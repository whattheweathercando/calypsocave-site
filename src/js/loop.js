
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
    // console.log(data);
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
                    rObj.imageFilename = obj.image[0].filename;
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
            console.log("Data Parsed :");
            console.log(dataParsed);
            console.log(dataParsed[i].imageFilename)
        }
        
        
        function setHtml(i) {
            if (dataParsed[i].imageFilename != ""){
                image1.src = `/img/${dataParsed[i].imageFilename}`;
                filename1.innerHTML = dataParsed[i].imageFilename;
                // let imageRatio1 = calcRatio(dataParsed[i].imageRatio);
                // image1.classList.remove('portrait', 'landscape');
                // image1.classList.add(imageRatio1);
            } 
            if (dataParsed[i].category == 1){
                image1.classList.remove('image-2');
                image1.classList.add('image-1');
                caption1.classList.remove('caption-2');
                caption1.classList.add('caption-1');
            } else if(dataParsed[i].category == 2){
                image1.classList.remove('image-1');
                image1.classList.add('image-2');
                caption1.classList.remove('caption-1');
                caption1.classList.add('caption-2');
            } 
            caption1.innerHTML = dataParsed[i].caption;
            dateSource1.innerHTML = dataParsed[i].dateSource;

        }
        

        async function setContent(i,v){
            data = await loadData(v);
            console.log(`Data from view "${views[v]}" loaded:`);
            console.log(data);
            parseData();
            // filterCategories();
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
            if (i < dataParsed.length-1){
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
                i = dataParsed.length-1;
            }
            //console.log(i);
            setHtml(i);
        }
        
        
        navToggle.addEventListener('click', function(){
            nav.classList.toggle('hidden');
            select.classList.toggle('hidden');
        });
        nextButton.addEventListener('click', nextEntry);
        prevButton.addEventListener('click', previousEntry);
        
        // arrow key presses
        document.addEventListener('keydown', function(e) {
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
        });

    }
    catch(e){
        console.log(e);
    }
});







