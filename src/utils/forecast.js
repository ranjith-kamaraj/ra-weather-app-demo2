require('dotenv').config();
const request = require('request');
const { get } = require('lodash');

const { WEATHER_STACK_BASE_URL, WEATHER_STACK_ACCESS_KEY } = process.env;
console.log(WEATHER_STACK_BASE_URL);

const forecast = (latitude, longtitude, callback) => {
    let url = `${WEATHER_STACK_BASE_URL}/current?access_key=${WEATHER_STACK_ACCESS_KEY}&query=${latitude},${longtitude}`;

    request({ url, json: true }, (error, response) => {
        if (response.body.error) {
            callback(`Unable to find the location!`, undefined)
        }
        else if (response.body.error && response.body.error.code) {
            callback(`Unable to find the location: ${response.body.error.info}`, undefined)
        }
        else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}.
            It is currently ${response.body.current.temperature} degrees out. 
            It feel like ${response.body.current.feelslike} degrees out.
            The humidity is ${response.body.current.humidity}.`);
        }
    })
}

module.exports = {
    forecast
};
