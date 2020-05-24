const request = require('request')

const forecast = (lng, lat, callback) => {
    const url =  'http://api.weatherstack.com/current?access_key=1214e577bd87e71035044ac7cec4719e&query='+lat+','+lng;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Trenutno je '+body.current.temperature+'. Feels like '+body.current.feelslike)
        }
    });
}

module.exports = forecast;