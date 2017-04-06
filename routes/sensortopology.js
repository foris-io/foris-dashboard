var database = require('./database');
var variables = require('./variables');
var request = require('request');
var Cloudant = require('cloudant');
var cloudant = Cloudant({account: 'sachet', password: 'Foris'});


/* GET sensor info */
var sensorInfo = function(req, res, next) {
  var db = cloudant.db.use("mobile_app");
	db.list({include_docs:true}, function(err,data){

		if(!err){

			data.rows.forEach(function(doc){

				console.log(doc);

			});
			res.send(data);
		}
	});
}

/* GET sensor realtime page. */
var sensorRealTimeData = function(req, res, next) {

   var url = "http://foris.mybluemix.net/HelloWorld?q=webapp_token_many";

    request({
    	method: 'GET',
        uri: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
        }
        res.send(body);
    });
}

module.exports.sensorInfo = sensorInfo;
module.exports.sensorRealTimeData = sensorRealTimeData;
