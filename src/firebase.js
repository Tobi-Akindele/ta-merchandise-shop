// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYEchge37RlW8XXcwkYWSGfuajDM2uvyI',
  authDomain: 'ta-merchandise.firebaseapp.com',
  projectId: 'ta-merchandise',
  storageBucket: 'ta-merchandise.appspot.com',
  messagingSenderId: '520533094916',
  appId: '1:520533094916:web:9039212dbf7bc24256bb51',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
