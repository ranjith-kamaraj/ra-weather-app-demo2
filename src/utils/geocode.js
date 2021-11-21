const request = require('request');
const { get } = require('lodash');

const geocode = (address, callback) =>{
    let mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoicmFuaml0aDEiLCJhIjoiY2t2eXduN3R5NHYyaDJ1dGsxN2Y0ZG5yZSJ9.hLoZZpIopfzbuUfS_DptuQ`;

    request({ url: mapBoxUrl, json: true }, (error, response) => {
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