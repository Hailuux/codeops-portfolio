const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const count = document.querySelector("#count");

const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone)) {
    return "Enter a valid phone.";
  }

  return "";
}

function save(people) {
  localStorage.setItem("people", JSON.stringify(people));
}

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

function updateCount() {
  const people = load();

  count.textContent = `${people.length} people have signed up.`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  error.textContent = message;

  if (message) {
    return;
  }

  const people = load();

  people.push({
    name: name,
    phone: phone
  });

  save(people);

  form.reset();

  error.textContent = "Signup successful!";

  updateCount();
});

updateCount();