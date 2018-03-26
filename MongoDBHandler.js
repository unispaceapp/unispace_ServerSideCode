
                                    /* CONNECT TO MONGODB */

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://nirchook:agent777@ds125198.mlab.com:25198/unispace", function (err,database) {
    const myAwesomeDB = database.db('unispace');
    myAwesomeDB.collection("Classrooms_Sunday").findOne({}, function(err, result) {
        console.log('CHECK BUILDING TEST PRINT: ' + result.building);
    });

                                    /* CONNECT TO FIREBASE */


    var admin = require("firebase-admin");

    var serviceAccount = require("/Users/Tiki/Downloads/unispace-198015-firebase-adminsdk-zhzqa-8b74ba5f68.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://unispace-198015.firebaseio.com"
    });

    var firebase = require("firebase");
    var config = {
        //apiKey: "<API_KEY>",
        authDomain: "unispace-198015.firebaseapp.com",
        databaseURL: "https://unispace-198015.firebaseio.com/",
        storageBucket: "unispace-198015.appspot.com\n",
    };
    firebase.initializeApp(config);



                            /* ADD ITEMS TO FIREBASE DATABASE */


    // child - creates a subgroup of json objects in firebase
    var ref = firebase.database().ref().child('unispace-198015');
    //Adds to the subgroup created
    ref.set({
        alanisawesome: {
            date_of_birth: "June 23, 1912",
            full_name: "Alan Turing"
        },
        gracehop: {
            date_of_birth: "December 9, 1906",
            full_name: "Grace Hopper"
        }
    });
    console.log("connected");

});