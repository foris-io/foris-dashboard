var database = require('./database');
var variables = require('./variables');
var request = require('request');
var Cloudant = require('cloudant');
var cloudant = Cloudant({account: '474306cf-8215-4090-879c-4fb2f25624a6-bluemix',
                         password: 'a0807af23864f72d10fc698e9d5e2a2a739411860d67625aabf73061d22acccd'});


/* GET sensor info */
var sensorInfo = function(req, res, next) {
  var db = cloudant.db.use("farm_sensors");
	db.list({include_docs:true}, function(err,data){

		if(!err){
			data.rows.forEach(function(doc){
			});
			res.send(data);
		}
	});
}

/* GET sensor info */
var sensorRealTimeData = function(req, res, next) {
  var db = cloudant.db.use("sensor-data");
	db.list({include_docs:true}, function(err,data){

		if(!err){
			data.rows.forEach(function(doc){
			});
			res.send(data);
		}
	});
}

/* GET sensor status */
var sensorStatus = function(req, res, next) {
  var db = cloudant.db.use("device-status");
	db.list({include_docs:true}, function(err,data){

		if(!err){
			data.rows.forEach(function(doc){
			});
			res.send(data);
		}
	});
}


module.exports.sensorInfo = sensorInfo;
module.exports.sensorRealTimeData = sensorRealTimeData;
module.exports.sensorStatus = sensorStatus;
