import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
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

let selectedRating = 0;

const stars = document.querySelectorAll(".stars-input span");

stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = star.getAttribute("data-value");

    stars.forEach(s => s.classList.remove("active"));

    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("active");
    }
  });
});

// SUBMIT REVIEW
document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const review = document.getElementById("review").value;
  const image = document.getElementById("image").value;

  if (selectedRating === 0) {
    alert("Please select a rating");
    return;
  }

  push(ref(database, "reviews"), {
    name,
    title,
    rating: selectedRating,
    review,
    image
  });

  this.reset();
});

// DISPLAY REVIEWS
const reviewsContainer = document.getElementById("reviewsContainer");

let total = 0;
let count = 0;

onValue(ref(database, "reviews"), (snapshot) => {
  reviewsContainer.innerHTML = "";

  if (!snapshot.exists()) {
    reviewsContainer.innerHTML = "<p>No reviews yet. Be the first!</p>";
    return;
  }

  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();

    total += Number(data.rating);
    count++;

  const reviewCard = `
  <div class="card">
    <h3>${data.title}</h3>
    <p>👤 ${data.name}</p>
    <p class="stars">${"⭐".repeat(data.rating)}</p>
    <p>${data.review}</p>
    ${data.image ? `<img src="${data.image}" />` : ""}
  </div>
`;

    reviewsContainer.innerHTML += reviewCard;
  });

  const avg = (total / count).toFixed(1);
  document.getElementById("avgRating").innerText =
    "⭐ Average Rating: " + avg + " / 5";
});
window.deleteReview = function (id) {
  remove(ref(database, "reviews/" + id));
};