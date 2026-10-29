import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const roots = ['app', 'components'];
const hits = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      const content = await readFile(full, 'utf8');
      const lines = content.split(/\r?\n/);
      lines.forEach((line, i) => {
        if (/<div\b[^>]*(?:onClick|onKeyDown)\s*=/.test(line)) hits.push(`${full}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}
for (const root of roots) await walk(root);
if (hits.length) {
  console.error('Possible clickable div patterns found:\n' + hits.join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS: no same-line <div> with onClick/onKeyDown found. Manual keyboard review is still required.');
}
