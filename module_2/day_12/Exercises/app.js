
// 1. STATE + ELEMENTS

const state = {
  rates: {},
  watchlist: []
};

const status = document.querySelector("#status");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const result = document.querySelector("#result");
const addWatchlist = document.querySelector("#add-watchlist");
const watchlist = document.querySelector("#watchlist");


// 2. RENDER WITH FAKE RATES


function render() {
  currency.innerHTML = "";

  Object.keys(state.rates).forEach(code => {
    const option = document.createElement("option");

    option.value = code;
    option.textContent = code;

    currency.append(option);
  });
}



state.rates = {
  USD: 0.0177,
  KES: 2.29
};

render();


// 3. LOAD LIVE RATES


async function loadRates() {

  status.textContent = "Loading rates...";

  try {

    const res = await fetch(
      "https://api.frankfurter.app/latest?from=ETB"
    );

    if (!res.ok) {
      throw new Error("Failed to load rates");
    }

    const data = await res.json();

    state.rates = data.rates;

    render();

    status.textContent = "";

  } catch (error) {

    status.textContent =
      "Unable to load currency rates.";

  }
}

// 4. CONVERT FORM


form.addEventListener("submit", event => {

  event.preventDefault();

  const amount = Number(amountInput.value);
  const code = currency.value;

  if (!Number.isFinite(amount) || amount <= 0) {

    result.textContent =
      "Enter a valid amount.";

    return;
  }

  const rate = state.rates[code];

  if (!rate) {

    result.textContent =
      "Currency rate is unavailable.";

    return;
  }

  const converted = amount * rate;

  result.textContent =
    `${amount.toFixed(2)} ETB = ${converted.toFixed(2)} ${code}`;

});

// 5. WATCHLIST


addWatchlist.addEventListener("click", () => {

  const code = currency.value;

  if (!code) {
    return;
  }


  if (state.watchlist.includes(code)) {
    return;
  }

  state.watchlist.push(code);

  save();

  renderWatchlist();

});


function renderWatchlist() {

  watchlist.innerHTML = "";

  state.watchlist.forEach(code => {

    const li = document.createElement("li");

    li.dataset.c = code;

    li.textContent = `${code} `;

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "Remove";

    li.append(button);

    watchlist.append(li);

  });

}


watchlist.addEventListener("click", event => {

  if (!event.target.matches("button")) {
    return;
  }

  const row = event.target.closest("li");

  const code = row.dataset.c;

  state.watchlist = state.watchlist.filter(
    item => item !== code
  );

  save();

  renderWatchlist();

});


// 6. SAVE, LOAD, INIT


function save() {

  localStorage.setItem(
    "watchlist",
    JSON.stringify(state.watchlist)
  );

}


function load() {

  try {

    const data = localStorage.getItem("watchlist");

    // Nothing has been saved yet

    if (data === null) {
      return;
    }

    const saved = JSON.parse(data);

    // Make sure the saved value is an array

    if (Array.isArray(saved)) {
      state.watchlist = saved;
    }

  } catch (error) {

    // Corrupt JSON

    state.watchlist = [];

  }

}


function init() {

  // Restore saved watchlist

  load();

  // Display restored watchlist

  renderWatchlist();

  // Get current rates

  loadRates();

}


// Start application

init();