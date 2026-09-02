//1
/*
<button id="theme-toggle">Toggle Theme</button>
<script src="app.js"></script>
*/
const button = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}


button.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem("theme", theme);
});


//2
function save(items) {
  localStorage.setItem("items", JSON.stringify(items));
}


function load() {
  try {
    const data = localStorage.getItem("items");

    if (data === null) {
      return [];
    }

    const items = JSON.parse(data);

    if (!Array.isArray(items)) {
      return [];
    }

    return items;

  } catch (error) {
    return [];
  }
}


//3
/*
<form id="signup-form">

  <label for="name">Name</label>
  <input id="name" type="text">

  <label for="phone">Phone</label>
  <input id="phone" type="tel">

  <button type="submit">Sign Up</button>

  <p id="error"></p>

</form>

<script src="app.js"></script>
*/
const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");


//4
const ethiopianPhone = /^\+2519\d{8}$/;

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name.length < 2) {
    error.textContent =
      "Name must be at least 2 characters.";
    return;
  }

  if (!ethiopianPhone.test(phone)) {
    error.textContent =
      "Phone must be in the format +251912345678.";
    return;
  }

  console.log("Valid signup!");
});


//5
form.addEventListener("submit", event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  error.textContent = "";

  if (name.length < 2) {
    error.textContent =
      "Name must be at least 2 characters.";
    return;
  }

  if (!ethiopianPhone.test(phone)) {
    error.textContent =
      "Phone must be in the format +251912345678.";
    return;
  }

  error.textContent = "Signup successful!";
});


//6
/*
<form id="signup-form">

  <label for="name">Name</label>
  <input id="name" type="text">

  <label for="phone">Phone</label>
  <input id="phone" type="tel">

  <button type="submit">Sign Up</button>

  <p id="error"></p>

</form>

<p id="count"></p>

<script src="app.js"></script>
*/
const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const count = document.querySelector("#count");

const ethiopianPhone = /^\+2519\d{8}$/;


// Save
function save(people) {
  localStorage.setItem("people", JSON.stringify(people));
}


// Load
function load() {
  try {
    const data = localStorage.getItem("people");

    if (data === null) {
      return [];
    }

    const people = JSON.parse(data);

    if (!Array.isArray(people)) {
      return [];
    }

    return people;

  } catch (error) {
    return [];
  }
}


// Show number of people
function updateCount() {
  const people = load();

  count.textContent =
    `${people.length} people have signed up.`;
}


// Submit form
form.addEventListener("submit", event => {
  event.preventDefault();

  error.textContent = "";

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();


  // Check name
  if (name.length < 2) {
    error.textContent =
      "Name must be at least 2 characters.";
    return;
  }


  // Check phone
  if (!ethiopianPhone.test(phone)) {
    error.textContent =
      "Phone must be in the format +251912345678.";
    return;
  }


  // Save signup
  const people = load();

  people.push({
    name: name,
    phone: phone
  });

  save(people);


  // Clear form
  form.reset();

  error.textContent = "Signup successful!";

  updateCount();
});


// Run when page loads
updateCount();