const status = document.querySelector("#status");
const list = document.querySelector("#list");

async function loadCities() {
  try {
    status.textContent = "Loading...";

    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const cities = await res.json();

    status.textContent = "";

    for (const city of cities) {
      const li = document.createElement("li");

      li.textContent = city.address.city;

      list.append(li);
    }

  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}

loadCities();