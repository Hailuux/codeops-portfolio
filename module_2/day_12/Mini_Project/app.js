const state = {
  rates: {
    USD: 0.0177,
    KES: 2.29
  },
  watchlist: [],
  currency: "USD"
};

const status = document.querySelector("#status");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const result = document.querySelector("#result");
const addWatchlist = document.querySelector("#add-watchlist");
const watchlist = document.querySelector("#watchlist");


function render() {
  currencySelect.innerHTML = Object.keys(state.rates)
    .map(code => `<option value="${code}">${code}</option>`)
    .join("");

  currencySelect.value = state.currency;

  renderWatchlist();
}


function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchlist.innerHTML = "<li>Your watchlist is empty.</li>";
    return;
  }

  watchlist.innerHTML = state.watchlist
    .map(code => `
      <li data-c="${code}">
        ${code}
        <button type="button">Remove</button>
      </li>
    `)
    .join("");
}


render();


async function loadRates() {
  status.textContent = "Loading currency rates...";

  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=ETB"
    );

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    state.rates = data.rates;

    if (!state.rates[state.currency]) {
      state.currency = Object.keys(state.rates)[0];
    }

    status.textContent = "";

    render();

  } catch (error) {
    status.textContent =
      "Unable to load currency rates. Please try again.";
  }
}


form.addEventListener("submit", event => {
  event.preventDefault();

  const amount = Number(amountInput.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    result.textContent =
      "Enter a valid amount greater than 0.";
    return;
  }

  const rate = state.rates[state.currency];

  if (!rate) {
    result.textContent =
      "The selected currency is unavailable.";
    return;
  }

  const converted = amount * rate;

  result.textContent =
    `${amount.toFixed(2)} ETB = ${converted.toFixed(2)} ${state.currency}`;
});


currencySelect.addEventListener("change", event => {
  state.currency = event.target.value;
  save();
});


addWatchlist.addEventListener("click", () => {
  const code = state.currency;

  if (state.watchlist.includes(code)) {
    return;
  }

  state.watchlist.push(code);

  save();
  render();
});


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
  render();
});


function save() {
  const data = {
    watchlist: state.watchlist,
    currency: state.currency
  };

  localStorage.setItem(
    "currencyApp",
    JSON.stringify(data)
  );
}


function load() {
  try {
    const data = localStorage.getItem("currencyApp");

    if (data === null) {
      return;
    }

    const saved = JSON.parse(data);

    if (Array.isArray(saved.watchlist)) {
      state.watchlist = saved.watchlist;
    }

    if (typeof saved.currency === "string") {
      state.currency = saved.currency;
    }

  } catch (error) {
    state.watchlist = [];
    state.currency = "USD";
  }
}


async function init() {
  load();
  render();
  await loadRates();
}


init();