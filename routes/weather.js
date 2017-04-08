var request = require("request");
//var weatherUrl = 'https://twcservice.mybluemix.net/api/weather/v1/geocode/?latitude=' + +  '/&longitude=' + +'/forecast/daily/7day.json';

var fetchWeatherData = function(req,res){
  var weatherUrl = `https://twcservice.mybluemix.net/api/weather/v1/geocode/37.80/122.27/forecast/daily/7day.json`;

  request.get(weatherUrl, {
    'auth': {
      'user': 'c97c0ad4-7e95-4642-95e8-dd7ea877449e',
      'pass': '8VsbkkdB1N',
      'sendImmediately': false
    }
  },function (error, response, body) {
    if (error) throw new Error(error);

    //Get the results
    var arr = [];
    var data = JSON.parse(body);
    console.log(data);
    var forecasts = data.forecasts;

    //Create an array of avg temperature
    for(var i=0; i < forecasts.length; i++){
      arr[i] = (forecasts[i].max_temp + forecasts[i].min_temp) / 2;
    }
    //Send the data
    res.send(arr);
  });
}

module.exports.fetchWeatherData = fetchWeatherData;
