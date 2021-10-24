const request =  require('request');

const geoCode = (address, callback) => {
    const GeoLocationApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicHVyb2hpdHJha2VzaDI3IiwiYSI6ImNrc2M2YTBtOTBkcHYyd3BrNGloZjYwdmsifQ.50O02ZDzK9xlM0ue_VG-mg&limit=1";
    request({url:GeoLocationApi,json: true},(error,response) => {
        if(error){
            callback('Unable to connect to service !', undefined);
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location !', undefined);     
        }
        else{
            const GeoLocation = response.body;
            const GeoLong = GeoLocation.features[0].geometry.coordinates[0];
            const GeoLat = GeoLocation.features[0].geometry.coordinates[1];
            callback(undefined,GeoLat+','+GeoLong);
        }    
    });    

}

module.exports = geoCode