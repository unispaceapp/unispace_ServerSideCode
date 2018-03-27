
const functions = require('firebase-functions');
var ResponseBuilder = require('jsonapi-response-builder');
var firebase = require("firebase");
console.log('firebase retreived');

var config = {
    //apiKey: "<API_KEY>",
    authDomain: "unispace-198015.firebaseapp.com",
    databaseURL: "https://todaysclassrooms.firebaseio.com/",
    storageBucket: "unispace-198015.appspot.com"
};
firebase.initializeApp(config);
/* FUNCTION FOR USER TO RETRIEVE ALL CLASSROOMS IN BUILDING 'request' */

exports.classroomsByBuilding = functions.https.onRequest((request, response) => {

    // TODO: FIND ALL MATCHING CLASSROOMS WITH SAME BUILDING AND RETURN IF FREE AT THIS HOUR
    var collection = firebase.database().ref().child('todaysclassrooms');


})


/* FUNCTION FOR USER TO RETRIEVE ALL CLASSROOMS (OF THIS HOUR?) */

exports.requestAllClassrooms = functions.https.onRequest((request, response) => {
    var admin = require("firebase-admin");
var collection = firebase.database().ref().child('todaysclassrooms');
// EXAMPLE OF LOOP THROUGH ITEMS IN DB
collection.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) =>{
    var childKey = childSnapshot.key;
var childData = childSnapshot.val();
});
});

//RETURN ALL CLASSROOMS IN JSON LIST?
});

/* FUNCTION FOR SERVER TO FILL LOCAL DATABASE EACH DAY  */

exports.dailyDBUpdate = functions.https.onRequest((request, response) => {

    /* CONNECT TO FIREBASE */
    var admin = require("firebase-admin");
// child - creates a subgroup of json objects in firebase
var ref = firebase.database().ref().child('tryit');


/* CONNECT TO MONGODB */
var MongoClient = require('mongodb').MongoClient;
var saveResult;
MongoClient.connect("mongodb://nirchook:agent777@ds125198.mlab.com:25198/unispace",  (err,database) => {
    if(err) throw err;
const myAwesomeDB = database.db('unispace');
myAwesomeDB.collection("Classrooms_Sunday").find({}, (err, result)  =>{
    if(err) throw err;
result.forEach((item) => {
    /* ADD ITEMS TO FIREBASE DATABASE */
    console.log('CHECK BUILDING TEST PRINT: ' + item.building);
var newPostRef = ref.push();
newPostRef.set({building: item.building,
    classroom: item.room
});

});
});
});

})
