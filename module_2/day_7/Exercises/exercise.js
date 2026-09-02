// 1
function vat(amount, rate = 0.15) {
  return amount * rate;
}
console.log(vat(1000));
console.log(vat(1000, 0.10));

const vatArrow = (amount, rate = 0.15) => amount * rate;
console.log(vatArrow(1000));

// 2
function makeCounter() {
let count = 0;

return function () {
count++;
return count;
};
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 4

/*
count stays private because it is declared inside
makeCounter(). Code outside the function cannot access
count directly. The returned function remembers count
through a closure.
*/

// 3
function discountBy(rate) {
return function (price) {
return price - (price * rate);
};
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log(memberPrice(1000)); // 900
console.log(salePrice(1000));   // 700


// 4
function applyToAll(list, fn) {
const results = [];
for (const item of list) {
results.push(fn(item));
}
return results;
}
function addVAT(price) {
return price * 1.15;
}
const prices = [100, 500, 1000, 2000];
const pricesWithVAT = applyToAll(prices, addVAT);
console.log(pricesWithVAT);

// 5
const cities = [
  "Addis Ababa",
  "Bahir Dar",
  "Gondar",
  "Hawassa",
  "Dire Dawa"
];

cities.forEach(function (city, index) {
console.log(`${index + 1}. ${city}`);
});
