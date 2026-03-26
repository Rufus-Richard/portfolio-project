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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let selectedRating = 0;
let selectedItem = "";

// ⭐ rating
document.querySelectorAll(".stars-input span").forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    document.querySelectorAll(".stars-input span").forEach(s => s.classList.remove("active"));
    for (let i = 0; i < selectedRating; i++) {
      document.querySelectorAll(".stars-input span")[i].classList.add("active");
    }
  });
});

// submit
document.getElementById("reviewForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const review = document.getElementById("review").value;
  const image = document.getElementById("image").value;

  if (!selectedRating) return alert("Select rating");

  push(ref(db, "reviews"), {
    name,
    title: selectedItem,
    rating: selectedRating,
    review,
    image
  });

  e.target.reset();
});

// display
const container = document.getElementById("reviewsContainer");

onValue(ref(db, "reviews"), snapshot => {
  container.innerHTML = "";
  let total = 0, count = 0;

  snapshot.forEach(child => {
    const d = child.val();
    total += d.rating;
    count++;

    container.innerHTML += `
      <div class="card">
        <h3>${d.title}</h3>
        <p>${d.name}</p>
        <p class="stars">${"⭐".repeat(d.rating)}</p>
        <p>${d.review}</p>
        ${d.image ? `<img src="${d.image}">` : ""}
        <button onclick="deleteReview('${child.key}')">Delete</button>
      </div>
    `;
  });

  document.getElementById("avgRating").innerText =
    count ? "⭐ Average Rating: " + (total / count).toFixed(1) : "No ratings yet";
});

// delete
window.deleteReview = function(id) {remove(ref(db, "reviews/" + id))};

// navigation
window.showSection = function(sec) {
  document.getElementById("categorySection").style.display = "none";
  ["movies","cafes","events"].forEach(s => document.getElementById(s).style.display = "none");
  document.getElementById(sec).style.display = "block";
};

window.selectItem = function(item) {
  selectedItem = item;
  document.getElementById("reviewSection").style.display = "block";
  document.getElementById("title").value = item;
};

window.goBack = function() {
  document.getElementById("categorySection").style.display = "block";
  ["movies","cafes","events","reviewSection"].forEach(s => document.getElementById(s).style.display = "none");
};

// slider
const imgs = [
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
];

let i = 0;
setInterval(()=>{
  i=(i+1)%imgs.length;
  document.getElementById("slideImage").src = imgs[i];
},3000);