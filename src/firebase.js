import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDSKH8tEO1Jpm9WZlMLT2Y9ZaOZIFn_dmk",
  authDomain: "budgettoiredb.firebaseapp.com",
  projectId: "budgettoiredb",
  storageBucket: "budgettoiredb.firebasestorage.app",
  messagingSenderId: "516835468232",
  appId: "1:516835468232:web:2bee66c338da72ad8e56fd",
  measurementId: "G-9902S7P881"
};

//     const firebaseConfig = {
//     apiKey: import.meta.env.VITE_API_KEY,
//     authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_APP_ID,
//     measurementId: "G-9902S7P881"
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistence set to local");
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });

