import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔑 YOUR REAL CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyCbxpeptH98EjMpYpuUqhLSUoRQ6FS5JrE",
  authDomain: "portfolio-project-641f2.firebaseapp.com",
  databaseURL: "https://portfolio-project-641f2-default-rtdb.firebaseio.com",
  projectId: "portfolio-project-641f2",
  storageBucket: "portfolio-project-641f2.firebasestorage.app",
  messagingSenderId: "217559741548",
  appId: "1:217559741548:web:d817facd59d78419915449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Firebase connected ✅");

// Form submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const messagesRef = ref(database, "messages");

  push(messagesRef, {
    name,
    email,
    message
  })
    .then(() => {
      document.getElementById("status").innerText = "Message sent ✅";
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("status").innerText = "Error ❌";
    });
});