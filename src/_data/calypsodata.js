// const Cache = require("@11ty/eleventy-cache-assets");
require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.API_KEY }).base(process.env.BASE_ID);

module.exports = () => {
  return new Promise((resolve, reject) => {
    let calypsoData = [];
      base('CC-main') 
        .select({ 
            view: 'web' 
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              calypsoData.push({
                id: record.get('ID'),
                caption: record.get('caption'),
                imageFilename: record.get('image-filename'),
                image: record.get('image'),
                dateSource: record.get('date-source'),
                category: record.get('category')
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(calypsoData);
              console.log(calypsoData);
            }
          }
        );
      });
    };
