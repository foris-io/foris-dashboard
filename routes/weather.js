var request = require("request");
//var weatherUrl = 'https://twcservice.mybluemix.net/api/weather/v1/geocode/?latitude=' + +  '/&longitude=' + +'/forecast/daily/7day.json';

var fetchWeatherData = function(req,res){
  var weatherUrl = "https://twcservice.mybluemix.net/api/weather/v1/geocode/37.806125/-122.230467/forecast/daily/7day.json";

  request.get(weatherUrl, {
    'auth': {
      'user': 'b5c2d043-830e-4ec7-a17d-76fbd4b8246e',
      'pass': 'lxaNrBIfcV',
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
      arr[i] = (forecasts[i].max_temp);
    }
    //Send the data
    res.send(arr);
  });
}

var fetchWeatherDataMain = function(req,res){
  var weatherUrl = "https://twcservice.mybluemix.net/api/weather/v1/geocode/37.806125/-122.230467/forecast/daily/7day.json";

  request.get(weatherUrl, {
    'auth': {
      'user': 'b5c2d043-830e-4ec7-a17d-76fbd4b8246e',
      'pass': 'lxaNrBIfcV',
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
      arr[i] = (forecasts[i]);
    }
    //Send the data
    res.send(arr);
  });
}


var fetchWeatherDataMin = function(req,res){
  var weatherUrl = "https://twcservice.mybluemix.net/api/weather/v1/geocode/37.806125/-122.230467/forecast/daily/7day.json";

  request.get(weatherUrl, {
    'auth': {
      'user': 'b5c2d043-830e-4ec7-a17d-76fbd4b8246e',
      'pass': 'lxaNrBIfcV',
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
      arr[i] = (forecasts[i].min_temp);
    }
    //Send the data
    res.send(arr);
  });
}

var fetchWeatherDataStatus = function(req,res){
  var weatherUrl = "https://twcservice.mybluemix.net/api/weather/v1/geocode/37.806125/-122.230467/forecast/daily/7day.json";

  request.get(weatherUrl, {
    'auth': {
      'user': 'b5c2d043-830e-4ec7-a17d-76fbd4b8246e',
      'pass': 'lxaNrBIfcV',
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
      arr[i] = (forecasts[i].day.phrase_12char);
    }
    //Send the data
    res.send(arr);
  });
}

module.exports.fetchWeatherData = fetchWeatherData;
module.exports.fetchWeatherDataMin = fetchWeatherDataMin;
module.exports.fetchWeatherDataMain = fetchWeatherDataMain;
