
require('dotenv').config();
const fs = require('fs');
//const EleventyFetch = require("@11ty/eleventy-fetch");
const path = require("path");
const Image = require("@11ty/eleventy-img");

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.API_KEY }).base(process.env.BASE_ID);
let selectedView = 'web'


async function fetchImage(url) {
  await Image(url, {
    widths: [null],
    formats: [null],
    outputDir: "./src/img/",
    cacheOptions: {
      // if a remote image URL, this is the amount of time before it fetches a fresh copy
      duration: "1d",
      // project-relative path to the cache directory
      directory: ".cache",
      removeUrlQueryParams: true,
    },
    // Define custom filenames for generated images
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}${extension}`;
    }
  });
};


module.exports = () => {
  return new Promise((resolve, reject) => {
    let calypsoDataWeb = [];
      base('CC-main') 
        .select({ 
            view: selectedView
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              calypsoDataWeb.push({
                id: record.get('ID'),
                caption: record.get('caption'),
                imageFilename: record.get('image-filename'),
                image: record.get('image'),
                dateSource: record.get('date-source'),
                category: record.get('category'),
                tags: record.get('tags'),
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(calypsoDataWeb);
              //console.log(calypsoDataWeb);
              
              // // write data to json file
              // const data = JSON.stringify(calypsoDataWeb);   
              // fs.writeFile(`src/data/cc-${selectedView}.json`, data, 'utf8', (err) => {
              //     if (err) {
              //         console.log(`Error writing file: ${err}`);
              //     } else {
              //         console.log(`File is written successfully!`);
              //     }
              // });

              // // 11ty fetch/cache images here
              // calypsoDataWeb.forEach(entry => {
              //   if (entry.image != undefined){
              //     let url = entry.image[0].url;
              //     //let filename = entry.imageFilename;
              //     //console.log(url)
              //     //console.log(filename)
              //     fetchImage(url);
              //   }
              // });
            }
          }
        );
      });
    };
