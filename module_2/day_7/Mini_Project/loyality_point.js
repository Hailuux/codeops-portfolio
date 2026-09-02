function createLoyalty(
earnRule = etb => Math.floor(etb / 10)
) {
let points = 0;
return {
earn(etb) {
points += earnRule(etb);
},
redeem(p) {
  points = Math.max(0, points - p);
},

balance() {
  return points;
}

};
}
const card = createLoyalty();

card.earn(250);       // 250 ETB → 25 points
card.redeem(10);      // 25 - 10 = 15 points

console.log(card.balance()); // 15

/* Holiday loyalty card */

const holiday = createLoyalty(
etb => Math.floor(etb / 10) * 2
);

holiday.earn(250);     // 250 ETB → 25 × 2 = 50 points
holiday.redeem(20);    // 50 - 20 = 30 points

console.log(holiday.balance()); // 30

holiday.redeem(100);
console.log(holiday.balance()); // 0
