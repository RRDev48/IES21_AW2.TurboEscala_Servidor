// Firebase Admin
const admin = require('firebase-admin');
const serviceAccount = require('./sdk/escalasobreruedas-firebase-adminsdk-aqk25-c8e4893b7d.json'); // Añade tu clave de servicio aquí

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Firebase normal
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDZaYEprmIwywal2kGbf3ZjKattxUqz6Rk",
    authDomain: "escalasobreruedas.firebaseapp.com",
    projectId: "escalasobreruedas",
    storageBucket: "escalasobreruedas.appspot.com",
    messagingSenderId: "727962288692",
    appId: "1:727962288692:web:4bb43e8504059e55788061"
};

const app = initializeApp(firebaseConfig);
const baseDeDatos = getFirestore(app);
const auth = admin.auth();
const firestore = admin.firestore();

module.exports = { baseDeDatos, auth, auth, firestore };