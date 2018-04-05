
const functions = require('firebase-functions');
var ResponseBuilder = require('jsonapi-response-builder');
var firebase = require("firebase");

var config = {
    //apiKey: "<API_KEY>",
    authDomain: "unispace-198015.firebaseapp.com",
    databaseURL: "https://todaysclassrooms.firebaseio.com/",
    storageBucket: "unispace-198015.appspot.com"
};
firebase.initializeApp(config);

//TODO: Fix indexes if logic is wrong
var hours = new Array(12);
hours[0] = "seven";
hours[1] = "eight";
hours[2] = "nine";
hours[3] = "ten";
hours[4] = "eleven";
hours[5] = "twelve";
hours[6] = "one";
hours[7] = "two";
hours[8] = "three";
hours[9] = "four";
hours[10] = "five";
hours[11] = "six";

/* FUNCTION FOR USER TO RETRIEVE ALL CLASSROOMS IN BUILDING 'request' */

exports.classroomsByBuilding = functions.https.onRequest((request, response) => {

    //Takes the child that matches the request building
    var wantedBuilding = firebase.database().ref().child(request.body.building);
var allClassrooms = [];
//TODO: Check what hour is returned (What time zone it uses)
var hour = new Date().getHours() + 1;
//Retrieves all the elements in the building child retrieved
wantedBuilding.on('value', (data) => {
    //Returns the actual object
    var b = data.val();
//gets the keys for each classroom in the building object
var keys = Object.keys(b);
// LOOP THROUGH ALL ENTRIES
for(var i = 0; i < keys.length; i++) {
    var k = keys[i];
    //CurrentClassroom is classroom object
    var currentClassroom = b[k];
    //check if classroom is free at current hour - minus 7 to match index in array
    if(currentClassroom[hours[hour-7]] === 0){
        //find until when the classroom is not taken by a lesson
        currentClassroom.freeuntil = freeUntil(currentClassroom);
        //add the classroom to the list to return
        allClassrooms.push(currentClassroom);
    }
}
//return the array of classrooms
response.json(allClassrooms);
}, (err)=>{if(err) throw err;})
})

//TODO FIX LOGIC
function freeUntil(classroom) {
    for(var h = new Date().getHours() + 1; h < 21; h++) {
        if(classroom[hours[h-7]] === 0) {
            continue;
        } else {
            return hours[h-7];
        }
    }
    return 0;
}

/* FUNCTION FOR USER TO RETRIEVE ALL CLASSROOMS (OF THIS HOUR?) */

exports.requestAllClassrooms = functions.https.onRequest((request, response) => {

    console.log('new all classrooms');
var admin = require("firebase-admin");
//Gets reference to entire database
var allBuildings = firebase.database().ref();
var hour = new Date().getHours() + 1;
console.log('HOUR: ' + hour);
var allClassrooms = {};
var building = "";
allBuildings.on('value', (snapshot) =>{
    console.log("snapshot = " + snapshot);
snapshot.forEach((snapshot1) => {
    var perBuilding = [];

console.log("Snapshot1 key = " + snapshot1.key); // e.g. "http://..."
snapshot1.forEach((childSnapshot)=> {
    console.log("childkey classroom = " + childSnapshot.val().classroom);
building = childSnapshot.val().building // e.g. "20170116"
var classroom = JSON.stringify(childSnapshot.val());
var JC = JSON.parse(classroom);
JC["freeuntil"] = freeUntil(childSnapshot.val(), hours);
console.log("classroom = " + JSON.stringify(JC));
childSnapshot.forEach((grandchildSnapshot) =>{
    console.log("grandchild key = " + grandchildSnapshot.key); // e.g. "-Kb9...gkE"
});
console.log("JC = "+  JC)
perBuilding.push(JC);
console.log("all classrooms = " + allClassrooms);
console.log("STRINGIFY: " + JSON.stringify(JC));
});
console.log("PER BUILDING = "  + perBuilding);
allClassrooms[building] = perBuilding;
});
console.log("the end ALL CLASSROOMS: " + allClassrooms);
response.json(allClassrooms);
});

});

/* FUNCTION FOR SERVER TO FILL LOCAL DATABASE EACH DAY  */

exports.dailyDBUpdate = functions.https.onRequest((request, response) => {

    var day = new Date().getDay();
console.log('entred function');
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
var admin = require("firebase-admin");
console.log('firebase admin');
var ref = firebase.database().ref();
console.log('got firebase ref');
var MongoClient = require('mongodb').MongoClient;
var saveResult;
MongoClient.connect("mongodb://nirchook:agent777@ds125198.mlab.com:25198/unispace",  (err,database) => {
    if(err) throw err;
const myAwesomeDB = database.db('unispace');
myAwesomeDB.collection("Classrooms_" + weekday[day]).find({}, (err, result)  =>{
    if(err) throw err;
result.forEach((item) => {
    console.log(item.building);
//Retreives the correct building to add the classroom to it as a child
var newPostRef = ref.child(item.building).push();
console.log('got child item');
//TODO: add all features of the classroom
newPostRef.set({building: item.building,
    classroom: item.room,
    hours: [{"seven": item.seven}, {"eight" : item.eight}, {"nine":item.nine}, {"ten":item.ten}, {"eleven":item.eleven}, {"twelve":item.twelve}, {"one":item.one}, {"two":item.two}]});
});

});
});
})

//TEST FUNCTION - FILL WITH WHATEVER AND CAN TEST WITH URL
exports.testIt = functions.https.onRequest((request, response) => {
    var day = new Date().getDay();
console.log('entred function');
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
var admin = require("firebase-admin");
console.log('firebase admin');
var ref = firebase.database().ref();
console.log('got firebase ref');
var MongoClient = require('mongodb').MongoClient;
var saveResult;
MongoClient.connect("mongodb://nirchook:agent777@ds125198.mlab.com:25198/unispace",  (err,database) => {
    if(err) throw err;
const myAwesomeDB = database.db('unispace');
myAwesomeDB.collection("Classrooms_" + weekday[day]).find({}, (err, result)  =>{
    if(err) throw err;
result.forEach((item) => {
    console.log(item.building);

var newPostRef = ref.child(item.building).push();
console.log('got child item');

newPostRef.set({building: item.building,
    classroom: item.room,});
});

});
});


})