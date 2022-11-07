



// markdown-it in browser, added to "window" on script load
// const md = window.markdownit();
const md = window.markdownit({
    html: true,
    breaks: true,
});


// html elements
const cave1 = document.querySelector('#cave-1');
const image1 = document.querySelector('#image-1');
const caption1 = document.querySelector('#caption-1');
const dateSource1 = document.querySelector('#date-source-1');
const icon1 = document.querySelector('#icon-1');

const cave2 = document.querySelector('#cave-2');
const image2 = document.querySelector('#image-2');
const caption2 = document.querySelector('#caption-2');
const dateSource2 = document.querySelector('#date-source-2');
const icon2 = document.querySelector('#icon-2');

const videoContainer = document.querySelector('.video-container');
const popup = document.querySelector('.popup');

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
    'blur',
];
// const tags = [
//     "-><-",
//     "? ∞ ?",
//     "#",
//     "key",
//     "$",
//     "- -",
//     "Odyssey",
//     "->",
//     "<-",
//     "[  ]",
//     "Walk"
// ];

// // append options to tag select
// tags.forEach( (tag,i) => {
//     //console.log(i,tag);
//     let opt = document.createElement('option');
//     opt.value = tag;
//     opt.innerHTML = `${i} - ${tag}`;
//     tagSelect.appendChild(opt);
// });

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
        let v = 4;
        // let t = "";

  
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
                if (obj.dateString2 != undefined){
                    rObj.dateString2 = obj.dateString2
                } else {
                    rObj.dateString2 = ""
                }
                if (obj.sourceStringFull != undefined){
                    rObj.sourceStringFull = obj.sourceStringFull
                } else {
                    rObj.sourceStringFull = ""
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

        
        function setHtml(i) {
            if (data1[i].id != "placeholder"){
                if (data1[i].imageFilename !== "" | data1[i].id == "empty-page"){
                    let imageRatio1 = calcRatio(data1[i].imageRatio);
                    image1.classList.remove('portrait', 'landscape');
                    image1.classList.add(imageRatio1);
                    image1.src = `/img/${data1[i].imageFilename}`;
                }   
                caption1.innerHTML = data1[i].caption;
                let dateSourceString1;
                if (data1[i].sourceStringFull !== "" ){
                    dateSourceString1 = `posted on ${data1[i].dateString2}`;
                    // dateSourceString1 = `${data1[i].dateString2}`;
                    let iconPath1 = `/img/_icons/${data1[i].sourceStringFull.toLowerCase()}.png`;
                    icon1.src = iconPath1;
                } else {
                    dateSourceString1 = "";
                }
                dateSource1.innerHTML = dateSourceString1;
            }
            
            if (data2[i].id != "placeholder"){
                if (data2[i].imageFilename != "" | data2[i].id == "empty-page"){
                    let imageRatio2 = calcRatio(data2[i].imageRatio);
                    image2.classList.remove('portrait', 'landscape');
                    image2.classList.add(imageRatio2)
                    image2.src = `/img/${data2[i].imageFilename}`;
                }
                caption2.innerHTML = data2[i].caption;
                let dateSourceString2;
                if (data2[i].sourceStringFull !== ""){
                    dateSourceString2 = `posted on ${data2[i].dateString2}`;
                    // dateSourceString2 = `${data2[i].dateString2}`;
                    let iconPath2 = `/img/_icons/${data2[i].sourceStringFull.toLowerCase()}.png`;
                    icon2.src = iconPath2;
                } else {
                    dateSourceString2 = "";
                }
                dateSource2.innerHTML = dateSourceString2;
            } 
        }


        function setHtml1(i) {
            if (data1[i].id != "placeholder"){
                if (data1[i].imageFilename !== "" | data1[i].id == "empty-page"){
                    let imageRatio1 = calcRatio(data1[i].imageRatio);
                    image1.classList.remove('portrait', 'landscape');
                    image1.classList.add(imageRatio1);
                    image1.src = `/img/${data1[i].imageFilename}`;
                }   
                caption1.innerHTML = data1[i].caption;
                let dateSourceString1;
                if (data1[i].sourceStringFull !== "" ){
                    dateSourceString1 = `posted on ${data1[i].dateString2}`;
                    // dateSourceString1 = `${data1[i].dateString2}`;
                    let iconPath1 = `/img/_icons/${data1[i].sourceStringFull.toLowerCase()}.png`;
                    icon1.src = iconPath1;
                } else {
                    dateSourceString1 = "";
                }
                dateSource1.innerHTML = dateSourceString1;
            }
        }
        function setHtml2(i) {
            if (data2[i].id != "placeholder"){
                if (data2[i].imageFilename != "" | data2[i].id == "empty-page"){
                    let imageRatio2 = calcRatio(data2[i].imageRatio);
                    image2.classList.remove('portrait', 'landscape');
                    image2.classList.add(imageRatio2)
                    image2.src = `/img/${data2[i].imageFilename}`;
                }
                caption2.innerHTML = data2[i].caption;
                let dateSourceString2;
                if (data2[i].sourceStringFull !== ""){
                    dateSourceString2 = `posted on ${data2[i].dateString2}`;
                    // dateSourceString2 = `${data2[i].dateString2}`;
                    let iconPath2 = `/img/_icons/${data2[i].sourceStringFull.toLowerCase()}.png`;
                    icon2.src = iconPath2;
                } else {
                    dateSourceString2 = "";
                }
                dateSource2.innerHTML = dateSourceString2;
            } 
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
        

        // // update on source select
        // //console.log(sourceSelect.value)
        // sourceSelect.addEventListener('change', async function setSource(event) {
        //      // get selected VALUE
        //     v = event.target.value;
        //     i = 0;
        //     //console.log(v);
        //     setContent(i,v);
            
        // });

    //     // filter by tag
    //     function filterTag(tag){
    //         data1 = data1All;
    //         data1 = data1.filter(entry => (entry.tags.includes(tag) == true ) );
    //         console.log(`Data1 filtered by tag "${tag}":`)
    //         console.log(data1);
    //         data2 = data2All;
    //         data2 = data2.filter(entry => (entry.tags.includes(tag) == true ) );
    //         console.log(`Data2 filtered by tag "${tag}":`);
    //         console.log(data2);  
    //     }

    //     tagSelect.addEventListener('change', async function setTag(event) {
    //         i = 0;
    //         // get selected VALUE
    //         t = event.target.value;
    //         console.log(t);
    //         filterTag(t);
    //         setHtml(i);
    //    });



    function hidePopup(){
        popup.classList.add('hidden');
    }
    function hideVideo(){
        videoContainer.classList.add('hidden');
    }
    
    // hide video and autoplay after vimeo player ended event
    const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);
    player.on('play', function(){
        hidePopup();
    });
    player.on('ended', function() {
        // console.log('Video ended');
        hideVideo();
        autoplay();
    });

    // to do : accelerate autoplay
    // using settimeout instead of setinterval
    // https://www.geeksforgeeks.org/how-to-change-the-time-interval-of-setinterval-method-at-runtime-using-javascript/


    // Timer
    let t = 6000;
    let timer;

    //autoplay();
     
    // Function that changes the timer
    function changeTimer(){
        t = t * 0.95;
        // console.log(t);
    }

    // Function to run at irregular intervals
    function autoplay() {
        nextEntry();
        
        if (i < data1.length-1){
            changeTimer();
            timer = setTimeout(autoplay, t);
        }
        
    }

    function stopAutoplay(){
        clearTimeout(timer);
        t = 6000;
        console.log('Stop Autoplay'); 
    }
    





        // content navigation 
        
        function nextEntry(){
            // // restarts autoplay
            // if (i == data1.length-2){
            //     stopAutoplay();
            // }
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
        
        function nextEntryUncoupled(cat){
            if (i < data1.length-1){
                i++;
            } else {
                i = 0;
            }
            if (cat == 1){
                setHtml1(i);
            } else if (cat == 2){
                setHtml2(i);
            }
        }
        function previousEntryUncoupled(cat){
            if (i > 0){
                i--;
            } else {
                i = data1.length-1;
            }
            if (cat == 1){
                setHtml1(i);
            } else if (cat == 2){
                setHtml2(i);
            }
            
        }
        
        
        

        // next on click
        cave1.addEventListener('click', (event) => {
            stopAutoplay(); 
            nextEntry()
        });
        cave2.addEventListener('click', (event) => {
            stopAutoplay();
            nextEntry();
        });
        
        // arrow key presses
        document.addEventListener('keydown', function(e) {
            if (e.shiftKey){
                switch (e.keyCode) {
                    case 37:
                        //console.log('left');
                        previousEntryUncoupled(1);
                        break;
                    case 39:
                        //console.log('right');
                        nextEntryUncoupled(1);
                        break;
                    case 38:
                        //console.log('up');
                        previousEntryUncoupled(2);
                        break;
                    case 40:
                        //console.log('down');
                        nextEntryUncoupled(2);
                        break;
                }
            } else {
                switch (e.keyCode) {
                    case 37:
                        //console.log('left');
                        previousEntry();
                        stopAutoplay();
                        break;
                    case 39:
                        //console.log('right');
                        nextEntry();
                        stopAutoplay();
                        break;
                }
            }
        });

    }
    catch(e){
        console.log(e);
    }
});







