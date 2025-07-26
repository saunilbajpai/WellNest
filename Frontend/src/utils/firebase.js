import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAUqCPiI_QlPo0yNIkMKBzkWG7M1yoh-cM",
  authDomain: "wellnest-4ce34.firebaseapp.com",
  projectId: "wellnest-4ce34",
  storageBucket: "wellnest-4ce34.firebasestorage.app",
  messagingSenderId: "608072732953",
  appId: "1:608072732953:web:89024871f67c972aacf588"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };



