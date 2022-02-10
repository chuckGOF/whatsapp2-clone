// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyAwcl604GcFYinGQXb0eHYiYq_pM4QIgmw",

	authDomain: "whatsapp2-f254c.firebaseapp.com",

	projectId: "whatsapp2-f254c",

	storageBucket: "whatsapp2-f254c.appspot.com",

	messagingSenderId: "285251936868",

	appId: "1:285251936868:web:901d3d2c4deb7810333571",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
