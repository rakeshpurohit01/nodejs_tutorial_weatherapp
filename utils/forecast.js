const request = require('request');

const weatherForcast = (latlong,callback) => {

    const WaatherApiUrl = "http://api.weatherstack.com/current?access_key=1041eb933807ce22f9c6286301c3e48d&type=&query="+latlong;
    request({url:WaatherApiUrl,json: true},(error,response) => {
        // Error Handling
        if(error){
            callback('Enable to Connect to weather API !',undefined);
        }
        else if(response.body.error){
            callback("Unable to find weather for given location!",undefined);
        }
        else{
            callback(undefined,"it's currently "+ response.body.current.temperature+ " degree out there, There is "+response.body.current.precip+"% chance of rain");
        }
    });
}

module.exports = weatherForcast