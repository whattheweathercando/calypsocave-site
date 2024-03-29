// const Cache = require("@11ty/eleventy-cache-assets");
require('dotenv').config();
const fs = require('fs');

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.API_KEY }).base(process.env.BASE_ID);
let selectedView = 'key';

module.exports = () => {
  return new Promise((resolve, reject) => {
    let calypsoDataKey = [];
      base('CC-main') 
        .select({ 
            view: selectedView
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              calypsoDataKey.push({
                id: record.get('ID'),
                caption: record.get('caption'),
                imageFilename: record.get('image-filename'),
                image: record.get('image'),
                dateSource: record.get('date-source'),
                category: record.get('category'),
                pagenumber: record.get('pagenumber'),
                tags: record.get('tags'),
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(calypsoDataKey);
              //console.log(calypsoDataKey);
              // write calypsoDataKey to json file
              // convert JSON object to a string
              const data = JSON.stringify(calypsoDataKey);
              // fs.writeFile(`src/data/cc-${selectedView}.json`, data, 'utf8', (err) => {
              //     if (err) {
              //         console.log(`Error writing file: ${err}`);
              //     } else {
              //         console.log(`File is written successfully!`);
              //     }
              // });
            }
          }
        );
      });
    };
