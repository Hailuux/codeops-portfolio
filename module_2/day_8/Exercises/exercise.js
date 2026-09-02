// 1
const prices = [500, 800, 1200, 1500, 300];

const total = prices
.map(price => price * 1.15)
.filter(price => price < 1000)
.reduce((sum, price) => sum + price, 0);

console.log(total);


// 2
const customer = {
name: "Abebe",
city: "Addis Ababa",
balance: 2500
};

for (const [key, value] of Object.entries(customer)) {
console.log(`${key}: ${value}`);
}


// 3
const { name, city } = customer;

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);


// 4
const customer = {
name: "Abebe",
city: "Addis Ababa",
balance: 2500
};

const updatedCustomer = {
...customer,
city: "Bahir Dar",
phone: "+251911234567"
};

console.log(customer);
console.log(updatedCustomer);

