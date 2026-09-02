const form = document.querySelector("#search-form");
const input = document.querySelector("#country");
const out = document.querySelector("#facts");


function render(parent, label, value) {
  const div = document.createElement("div");

  div.classList.add("fact");

  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;

  const span = document.createElement("span");
  span.textContent = value;

  div.append(strong, span);

  parent.append(div);
}


async function showCountry(name) {
  out.textContent = "Loading…";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
    );

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const [c] = await res.json();

    out.innerHTML = "";

    
    const flag = document.createElement("img");
    flag.src = c.flags.svg;
    flag.alt = `Flag of ${c.name.common}`;

    out.append(flag);


    render(out, "Country", c.name.common);
    render(out, "Capital", c.capital?.[0] || "N/A");
    render(out, "Population", c.population.toLocaleString());
    render(out, "Region", c.region);

    
    const currencies = Object.values(c.currencies || {})
      .map(currency => `${currency.name} (${currency.symbol || ""})`)
      .join(", ");

    render(out, "Currencies", currencies || "N/A");

  } catch (err) {
    out.innerHTML = "";

    const error = document.createElement("p");
    error.classList.add("error");
    error.textContent =
      err.message === "Country not found"
        ? "Country not found. Please check the country name."
        : "Unable to load country information. Please try again.";

    out.append(error);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = input.value.trim();

  if (!name) {
    out.textContent = "Please enter a country name.";
    return;
  }

  showCountry(name);
});

showCountry("ethiopia");