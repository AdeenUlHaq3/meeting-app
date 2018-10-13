import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCuaz2xMr8yTLoA7TRZOUB6bcxzCNVfCeI",
    authDomain: "meeting-app3.firebaseapp.com",
    databaseURL: "https://meeting-app3.firebaseio.com",
    projectId: "meeting-app3",
    storageBucket: "meeting-app3.appspot.com",
    messagingSenderId: "634117764125"
};
firebase.initializeApp(config);

export default firebase;