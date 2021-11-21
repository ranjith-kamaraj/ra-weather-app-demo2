const request = require('request');
const { get } = require('lodash');

const forecast = (latitude, longtitude, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=e58ddd22fa7d7b4f3960a2744d1a6c8b&query=${latitude},${longtitude}`;

    request({ url, json: true }, (error, response) => {
        if (response.body.error) {
            callback(`Unable to find the location!`, undefined)
        }
        else if (response.body.error && response.body.error.code) {
            callback(`Unable to find the location: ${response.body.error.info}`, undefined)
        }
        else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feel like ${response.body.current.feelslike} degrees out.`);
        }
    })
}

module.exports = {
    forecast
};