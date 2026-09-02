// 1
// <h1 id="title">Old Title</h1>
// <script src="script.js"></script>

const title = document.querySelector("#title");
title.textContent = "Welcome to Addis Ababa";
title.classList.toggle("highlight");


// 2
// <ul id="cityList"></ul>
//<script src="script.js"></script>
const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];
const cityList = document.querySelector("#cityList");
for (const city of cities) {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
}


// 3
/*<div id="box">
  <button id="btn">Click Me</button>
</div>

<script src="script.js"></script>*/
const box = document.querySelector("#box");
const button = document.querySelector("#btn");

button.addEventListener("click", event => {
  console.log("Button listener:");
  console.log(event.target);
});

box.addEventListener("click", event => {
  console.log("Div listener:");
  console.log(event.target);
});


// 4
/*
<ul id="itemList">
  <li>
    Apple
    <button>Delete</button>
  </li>

  <li>
    Bread
    <button>Delete</button>
  </li>

  <li>
    Milk
    <button>Delete</button>
  </li>
</ul>

<script src="script.js"></script>
 */
const itemList = document.querySelector("#itemList");

itemList.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    event.target.parentElement.remove();
  }
});


// 5
/*
<form id="itemForm">
  <input id="itemInput" type="text" placeholder="Enter an item">
  <button type="submit">Add</button>
</form>

<ul id="itemList"></ul>

<script src="script.js"></script>
*/
const form = document.querySelector("#itemForm");
const input = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemList");

form.addEventListener("submit", event => {
  event.preventDefault();

  const value = input.value;

  const li = document.createElement("li");
  li.textContent = value;

  itemList.append(li);

  input.value = "";
});