import { transactions } from "./transactions.js";
import { totalByType, formatReceipts } from "./report.js";

const credits = totalByType(transactions, "credit");
const debits = totalByType(transactions, "debit");

const creditTransactions = transactions.filter(
  transaction => transaction.type === "credit"
);
const debitTransactions = transactions.filter(
  transaction => transaction.type === "debit"
);

const receipts = formatReceipts(transactions);

const correctedTransaction = {
  ...transactions[0],
  amount: 300
};

console.log("=== TeleBirr Shop Report ===");

console.log(`Credits: ${credits} ETB`);
console.log(`Debits: ${debits} ETB`);

console.log("\nReceipts:");

for (const receipt of receipts) {
  console.log(receipt);
}

console.log("\nOriginal transaction:");
console.log(transactions[0]);

console.log("\nCorrected transaction:");
console.log(correctedTransaction);