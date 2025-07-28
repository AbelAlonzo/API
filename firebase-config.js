
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"; 
    
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDsndHswnDt-2IrNLCIF12lJj1bmo5NKpU",
    authDomain: "api-project-5f44e.firebaseapp.com",
    projectId: "api-project-5f44e",
    storageBucket: "api-project-5f44e.firebasestorage.app",
    messagingSenderId: "940726925276",
    appId: "1:940726925276:web:5def74220e25b31de24119"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export { db, auth, app }
