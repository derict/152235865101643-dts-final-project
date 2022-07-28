import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCB9yGVX5hz3689KYPnH7cREAn-XFLs9Tw",
  authDomain: "mood-meter-3af98.firebaseapp.com",
  projectId: "mood-meter-3af98",
  storageBucket: "mood-meter-3af98.appspot.com",
  messagingSenderId: "224016487924",
  appId: "1:224016487924:web:215fcafd542eb198d295a1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }