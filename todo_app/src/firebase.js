




import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = ({
    apiKey: "AIzaSyD4RDpdKscxPyMxtD6TOr5c9MGgsxWR0Ow",
    authDomain: "your-personal-todo-app.firebaseapp.com",
    projectId: "your-personal-todo-app",
    storageBucket: "your-personal-todo-app.firebasestorage.app",
    messagingSenderId: "63494728085",
    appId: "1:63494728085:web:3b67800c68ec5980fd6e9c",
    measurementId: "G-CHV6ZSES90"
})
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};