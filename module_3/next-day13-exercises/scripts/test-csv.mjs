import assert from 'node:assert/strict';
import { ordersToCsv } from '../lib/csv.ts';
const rows = [
  { id: 'T1', customer: 'Tesfaye, Hana', neighbourhood: 'Bole', date: '2026-10-28', total: 100, status: 'Delivered' },
  { id: 'T2', customer: 'Abebe "Buna" Kebede', neighbourhood: 'Piassa', date: '2026-10-28', total: 200, status: 'Preparing' },
];
const csv = ordersToCsv(rows);
assert.match(csv, /"Tesfaye, Hana"/);
assert.match(csv, /"Abebe ""Buna"" Kebede"/);
assert.equal(csv.split('\r\n').length, 4);
console.log('CSV escaping passed: comma and quotation-mark values are correctly quoted and embedded quotes doubled.');
