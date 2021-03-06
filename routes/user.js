
var database = require('./database');
var variables = require('./variables');
var request = require('request');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

function login(req,res){
	res.render('login', { title: variables.page_title + ' Login' });
}

function resetpassword(req,res) {
    res.render('reset_password', { title: 'Reset Password'});
}

function home(req,res){
	res.render('index', { title: variables.page_title + ' Home' });
}

function humidity(req,res){
    res.render('indv_sensors', { title: 'Humidity', json_name: "Humidity", color: "#ffff00" });
}

function water(req,res){
    res.render('indv_sensors', { title: 'Water Comsumption', json_name: "Water", color: "#20B2AA" });
}

function moisture(req,res){
    res.render('indv_sensors', { title: 'Moisture', json_name: "Moisture", color: "#20B2AA" });
}

function temperature(req,res){
    res.render('indv_sensors', { title: 'Temperature', json_name: "Temperature", color: "#F08080" });
}

function pH(req,res){
    res.render('indv_sensors', { title: 'pH', json_name: "Ph", color: "#C71585" });
}

function salinity(req,res){
    res.render('indv_sensors', { title: 'Salinity', json_name: "Salinity", color: "#FF5733" });
}

function sensortopology(req,res) {
    res.render('sensortopology', { title: 'SensorTopology'});
}

function livedata(req,res) {
    res.render('live_data', { title: 'Live Data'});
}

exports.login = login;
exports.resetpassword = resetpassword;
exports.home = home;
exports.humidity = humidity;
exports.water    = water;
exports.moisture = moisture;
exports.temperature = temperature;
exports.pH = pH;
exports.salinity = salinity;
exports.sensortopology = sensortopology;
exports.livedata = livedata;


//MAINTAINING SESSION LOGIN
exports.checklogin = function(req, res) {
    console.log("checking session");
    console.log(req.session.uname);
    if (req.session.uname) {
        console.log("session is " + req.session.uname);
        res.send({
            "status" : 200
        });
    } else {
        res.send({
            "status" : 300
        });
    }
};

// Signing in User
exports.signin = function(req, res) {

    console.log("Inside Signin");
    console.log(req.param("name", "password"));
    var name = req.param("name");
    var password = req.param("password");
    // read a document
    database.getUserDetails(function(err, results) {
        if (err) {
            // throw err;
            console.log("Invalid User Name & Password");
            res.send({
                "status" : 100
            });
        } else {

            if(results.pwd == password )
            {
                req.session.uname = results._id;
                console.log("Session name: " + req.session.uname);
                console.log("success");
                res.render('index');
            }
            else
            {
                console.log("Invalid User Name & Password");
                        res.send({
                            "status" : 100
                        });

            }
        }

    },variables.foris_users,name);

};

//Signup User
exports.signup = function(req, res) {

    console.log("Inside Signup");
    console.log(req.param("name", "fname", "lname", "password", "email", "devid"));
    var name = req.param("name"),
        fname = req.param("fname"),
        lname = req.param("lname"),
        password = req.param("password"),
        email = req.param("email"),
        devid = req.param("devid");

    // read a document
    database.createUser(function(err, results) {
        if (err) {
           // throw err;
            console.log("Error message: " + err.description + ". Reason: " + err.reason);

            res.send({
                "status" : err.statusCode
            });
        } else {
            req.session.uname = name;
            console.log("Session name: " + req.session.uname);
            console.log("success");
            res.render('index');
        }
    },variables.foris_users,name,fname,lname,email,password,devid);

};

//Get Profile Details////////////////////////////////////////////////
exports.profileusername = function(req, res){
    console.log("Inside profileusername");
    var name = req.session.uname;
    console.log(req.session.uname);
    database.getUserDetails(function(err, results) {
        if (err) {
            console.log("Unable to get user details");
            res.send({
                "status" : 100
            });
        } else {
            console.log(results);
            var jsonstr=JSON.stringify(results);
            console.log(jsonstr);
            console.log("Entry successfully fethced and displayed on PROFILE GUI");
            res.send({"result":jsonstr});
        }
    }, variables.foris_users, name);

};

//Get Sensor Data////////////////////////////////////////////////
exports.sensordata = function(req, res){
    console.log("Inside sensordata");
    var name = req.session.uname;
    // request('http://foris.mybluemix.net/HelloWorld?q=webapp_token_many', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var jsonstr=JSON.stringify(body);
    //         var jsonarray = JSON.parse(body);
    //         // var d1 = data[0];
    //         // var d2 = d1["sensor"];
    //         // var d3 = d2["Moisture"];
    //         console.log("Sensor data successfully fethced");
    //         console.log("Sensor Data:" + jsonstr);
    //         res.send({"sensor_data":jsonstr, "sensor_arr":jsonarray});
    //     }
    //     else
    //     {
    //         console.log("Unable to get sensor data");
    //         res.send({
    //             "status" : 100
    //         });
    //     }
    // });

    database.allDocs(function(err, results) {
        var res_dict = [];
        if (err) {
            console.log("Unable to get sensor data");
            res.send({
                "status" : 100
            });
        } else {
            console.log("Printing sensor data in loop");

            results.rows.forEach(function(doc){

                console.log(doc["doc"].data);

                var dattime = doc["doc"].TimeStamp;
                var timestamp = new Date(Date.UTC(dattime.substring(0, 4), (dattime.substring(5, 7) - 1), dattime.substring(8, 10), dattime.substring(11, 13), dattime.substring(14, 16), dattime.substring(17, 19) ));
                var water_cons = 8 / ((doc["doc"].data.moisture / 830));


                if(doc["doc"].data.temperature > 0) {
                    res_dict.push({
                        "TimeStamp": doc["doc"].TimeStamp,
                        "DateTime": timestamp,
                        "Temperature": doc["doc"].data.temperature,
                        "Humidity": doc["doc"].data.humidity,
                        "Moisture": doc["doc"].data.moisture,
                        "Salinity": doc["doc"].data.salinity,
                        "Water" : water_cons
                    });
                }


            });

            // res_dict.sort(dynamicSort("DateTime"));
            res_dict.sort(function(a, b) {
                return parseFloat(a.DateTime) - parseFloat(b.DateTime);
            });

            function compare(a,b) {
                if (a.DateTime < b.DateTime)
                    return -1;
                if (a.DateTime > b.DateTime)
                    return 1;
                return 0;
            }

            res_dict.sort(compare);
            res.send(res_dict);
        }
    }, variables.sensor_db);

};


//Logout session
exports.logoutsession = function(req, res) {
    console.log("checking logout");
    req.session.destroy();
    res.send({
        "status" : 200
    });
};

//Reset Password functionality
exports.resetpasswordfunc = function(req, res) {
    console.log("Inside Reset Password");
    var pwd1 = req.param("pwd1"),
        pwd2 = req.param("pwd2"),
        username = req.param("username");

    database.getUserDetails(function(err, results) {
        if (err) {
            console.log("Unable to get user details");
            res.send({
                "status" : 100
            });
        } else {
            console.log(results);

    // read a document
    database.updateUser(function(err, results) {
        if (err) {
            // throw err;

            console.log("Error message: " + err.description + ". Reason: " + err.reason);

            res.send({
                "status" : err.statusCode
            });
        } else {

            console.log("Password reset success");
            res.render('index');
        }
    },"pwd",pwd1);

        }
    }, variables.foris_users, username);
};


