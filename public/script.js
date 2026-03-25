import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
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

// SUBMIT REVIEW
document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review").value;

  push(ref(database, "reviews"), {
    name,
    rating,
    review
  });

  document.getElementById("reviewForm").reset();
});

// DISPLAY REVIEWS
const reviewsContainer = document.getElementById("reviewsContainer");

onValue(ref(database, "reviews"), (snapshot) => {
  reviewsContainer.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();

    const reviewCard = `
      <div class="card">
        <h3>${data.name}</h3>
        <p class="stars">${"⭐".repeat(data.rating)}</p>
        <p>${data.review}</p>
      </div>
    `;

    reviewsContainer.innerHTML += reviewCard;
  });
});