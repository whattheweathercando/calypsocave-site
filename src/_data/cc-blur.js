// const Cache = require("@11ty/eleventy-cache-assets");
require('dotenv').config();
const fs = require('fs');
const dayjs = require('dayjs')

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.API_KEY }).base(process.env.BASE_ID);
let selectedView = 'blur';

module.exports = () => {
  return new Promise((resolve, reject) => {
    let calypsoDataBlur = [];
      base('CC-main') 
        .select({ 
            view: selectedView 
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              calypsoDataBlur.push({
                id: record.get('ID'),
                caption: record.get('caption'),
                imageFilename: record.get('image-filename'),
                image: record.get('image'),
                dateString: record.get('date-string'),
                sourceString: record.get('source-string'),
                sourceStringFull: record.get('source-name'),
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
              resolve(calypsoDataBlur);
              console.log('calypsoDataBlur:')
              console.log(calypsoDataBlur);
              
              calypsoDataBlur = calypsoDataBlur.map(
                (item) => {
                  // add formatted date-string 
                  let dateStringFormatted = dayjs(item.dateString).format('D MMM YYYY');
                  return {...item, dateString2: `${dateStringFormatted}`}
              });

              // // write calypsoDataBlur to json file
              // const data = JSON.stringify(calypsoDataBlur);
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
