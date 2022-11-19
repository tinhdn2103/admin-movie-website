import firebase from "firebase/compat/app";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD7iuL10nFJi-pkDXPv4e0vAUvnoVz1Auk",
  authDomain: "movie-web-fadf1.firebaseapp.com",
  projectId: "movie-web-fadf1",
  storageBucket: "movie-web-fadf1.appspot.com",
  messagingSenderId: "131558307872",
  appId: "1:131558307872:web:23b94d98db73a974a0e445",
  measurementId: "G-9ZK1ELNSLY",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
