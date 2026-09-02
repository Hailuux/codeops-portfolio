const form = document.querySelector("#add-form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");


// Add a new row
function addRow(itemName, itemPrice) {
  const li = document.createElement("li");

  const itemText = document.createElement("span");
  itemText.textContent = `${itemName} - ${itemPrice} ETB`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("del");

  li.append(itemText, deleteButton);

  list.append(li);
}


// Calculate and display total
function updateTotal() {
  const rows = list.querySelectorAll("li");

  let total = 0;

  for (const row of rows) {
    const text = row.querySelector("span").textContent;

    const itemPrice = Number(
      text.split(" - ")[1].replace(" ETB", "")
    );

    total += itemPrice;
  }

  totalEl.textContent = total;
}


// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const n = name.value.trim();
  const p = Number(price.value);

  if (!n || !p) return;

  addRow(n, p);

  form.reset();

  updateTotal();
});


// Event delegation
list.addEventListener("click", (e) => {

  if (e.target.matches(".del")) {
    e.target.closest("li").remove();
    updateTotal();
  }

  else if (e.target.matches("li")) {
    e.target.classList.toggle("bought");
  }

});