import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAcqNuryDyubueojyLhTTKhFgV_nyhzmCY",
  authDomain: "ecommerce-b412c.firebaseapp.com",
  projectId: "ecommerce-b412c",
  storageBucket: "ecommerce-b412c.appspot.com",
  messagingSenderId: "206067050799",
  appId: "1:206067050799:web:35197ba3790621db55d9da"
};

const app = initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.googleAuthProvider;