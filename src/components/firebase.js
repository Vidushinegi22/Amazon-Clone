import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBL9wA7T6pQ9GnaKiim1AK1rv8hQ3GrZto",
    authDomain: "clone-cabff.firebaseapp.com",
    projectId: "clone-cabff",
    storageBucket: "clone-cabff.appspot.com",
    messagingSenderId: "1053434821692",
    appId: "1:1053434821692:web:6ebcbe3dfecb1737eb5739",
    measurementId: "G-Z3N6YW6NXC"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };