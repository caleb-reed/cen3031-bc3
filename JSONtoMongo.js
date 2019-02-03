'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listings = require('./listings.json');


/* Connect to your database */
mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
for (var i = 0; i < listings.entries.length; i++) {
    //Creates a new listing
    var newListing = Listing({
        name: listings.entries[i].name,
        code: listings.entries[i].code,
        address: listings.entries[i].address
    });
    if (listings.entries[i].coordinates)
    {
        newListing.coordinates.latitude = listings.entries[i].coordinates.latitude;
        newListing.coordinates.longitude = listings.entries[i].coordinates.longitude;
        }
    
    //save the listing
    newListing.save(function (err) {
        if (err) throw err;

        console.log('Listing created!');
    });

}


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */