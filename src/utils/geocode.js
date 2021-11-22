require('dotenv').config();
const request = require('request');
const { get } = require('lodash');

const { MAPBOX_BASE_URL, MAPBOX_ACCESS_KEY } = process.env;

console.log("Map Box URL" + MAPBOX_BASE_URL);

const geocode = (address, callback) =>{
    let mapBoxUrl = `${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=${MAPBOX_ACCESS_KEY}`;
    console.log("Map Box Main URL" + mapBoxUrl);

    request({ url: mapBoxUrl, json: true }, (error, response) => {
    console.log("Geo Code Response" + JSON.stringify(response));    
        
    if (response && response.body.features.length == 0) {
        callback(`Unable to find the location service!`, undefined)
    }
    else {
    callback(undefined, {
        longtitude: get(response, 'body.features[0].center[0]'),
        latitude: get(response, 'body.features[0].center[1]'),
        place: get(response, 'body.features[0].place_name'),
    })
    }   
})

};

module.exports = {
    geocode
};
