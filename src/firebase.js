import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQmqULX_dentowJXSdJ5qn0hWRJ-IrS34",
  authDomain: "reactapp-cad5f.firebaseapp.com",
  projectId: "reactapp-cad5f",
  storageBucket: "reactapp-cad5f.appspot.com",
  messagingSenderId: "418361206164",
  appId: "1:418361206164:web:ba50a465b3c8c589689b81"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
