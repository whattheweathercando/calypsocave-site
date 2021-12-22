// const Cache = require("@11ty/eleventy-cache-assets");
require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.API_KEY }).base(process.env.BASE_ID);

module.exports = () => {
  return new Promise((resolve, reject) => {
    let calypsoData = [];
      base('CC-main') 
        .select({ 
            view: 'book' 
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              calypsoData.push({
                id: record.get('ID'),
                caption: record.get('caption'),
                imageFilename: record.get('image-filename')
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(calypsoData);
              //console.log(calypsoData);
            }
          }
        );
      });
    };




// require('dotenv').config();
// var Airtable = require('airtable');
// var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE_ID);

// base('CC-main').select({
//     // Selecting the first 3 records in all:
//     //maxRecords: 3,
//     view: "book"
// }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     records.forEach(function(record) {
//         console.log('Retrieved', record.get('ID'));
//     });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
// });