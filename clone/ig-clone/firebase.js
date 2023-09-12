import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgSvtqoM6lS8L46VGjjms3u1IwU9Dl1lg",
  authDomain: "instagram-clone-e408a.firebaseapp.com",
  projectId: "instagram-clone-e408a",
  storageBucket: "instagram-clone-e408a.appspot.com",
  messagingSenderId: "52085276649",
  appId: "1:52085276649:web:cba800473def8674b91578",
  measurementId: "G-EH3B9VSPE5"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export {firebase, db}