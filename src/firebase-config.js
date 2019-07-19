import firebase from "firebase";

export let config = {
  // set your firebase config data here
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

let app = firebase.initializeApp(config);
let db = firebase.database();

export { app, db };
