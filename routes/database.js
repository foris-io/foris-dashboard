/**
 * Created by Pavani Vellal on 05-Mar-2017.
 */

var variables = require('./variables');

var ejs = require("ejs");
var async = require('async');
var Cloudant = require('cloudant');
var username = variables.username,
    password = variables.password,
    cloudant = Cloudant({account: username, password: password}),
   // dbname = null,
    db = null,
    userDoc = null,
    doc = null;


function getConnection(dbName) {

// load the Cloudant library
    db = cloudant.db.use(dbName);
    return db;
}

function fetchData(callback,dbName,docID){
    console.log("Reading document " + docID);
    var db=getConnection(dbName);
    db.get(docID, function(err, data) {
        console.log("Error:", err);
        console.log("Data:", data);
        // keep a copy of the doc so we know its revision token
        doc = data;
        callback(err, data);
    });
}

function createUser(callback,dbName,docID, fname, lname, email,password,devid){
    console.log("Creating document " + docID);
    var db=getConnection(dbName);
    db.insert({ _id: docID, pwd: password, email: email, user_type: "C", device_id:devid, fname: fname, lname: lname }, function(err, data) {
    console.log("Error:", err);
    console.log("Data:", data);
    userDoc  = data;
    callback(err, data);
  });
}
//To update a document in the database
function updateUser(callback,fieldID,newValue){
    console.log("Reading document");
    var db=getConnection(variables.foris_users);
    if(fieldID == "pwd") {
        userDoc.pwd = newValue;
    }
    db.insert(userDoc, function(err, data) {
        console.log("Error:", err);
        console.log("Data:", data);
        // keep the revision of the update so we can delete it
        userDoc._rev = data.rev;
        callback(err, data);
    });
}

//Reading all documents in database
function allDocs(callback,dbName){
    console.log("Reading all documents in db " + dbName);
    var db=getConnection(dbName);
    db.list({include_docs:true}, function(err,data){
        console.log("Error:", err);
        console.log("Data:", data);
        callback(err, data);
    });
}

//Get User Details
function getUserDetails(callback,dbName,docID){
    console.log("Reading document " + docID);
    var db=getConnection(dbName);
    db.get(docID, function(err, data) {
        console.log("Error:", err);
        console.log("Data:", data);
        // keep a copy of the doc so we know its revision token
        userDoc = data;
        callback(err, data);
    });
}


exports.fetchData=fetchData;
exports.createUser=createUser;
exports.allDocs = allDocs;
exports.getUserDetails = getUserDetails;
exports.updateUser = updateUser;