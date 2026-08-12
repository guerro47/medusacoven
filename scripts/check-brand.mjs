#!/usr/bin/env node
/**
 * Brand + liability gate (Phase 0, W8 CI).
 *
 * Fails the build when any tracked source file contains:
 *  1. "Velvet" (any casing) — retired brand, must never resurface.
 *  2. Standalone all-caps "COVEN" used as a brand string. "the Coven"
 *     (the inner-circle feature, noun only) and lowercase "medusacoven"
 *     (repo/domain) are allowed.
 *  3. Stripe / PayPal identifiers inside apps/ — high-risk rails only
 *     (CCBill / Segpay); low-risk processors are hard-blocked.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execSync('git ls-files --cached --others --exclude-standard', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.startsWith('scripts/check-brand'))
  .filter((f) => !f.startsWith('.github/'))
  .filter((f) => /\.(ts|tsx|js|jsx|mjs|cjs|css|html|md|json|sql|txt|svg)$/.test(f));

const violations = [];

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    const loc = `${file}:${i + 1}`;

    if (/velvet/i.test(line)) {
      violations.push(`${loc} — retired brand string "Velvet": ${line.trim()}`);
    }

    // Standalone all-caps COVEN (not part of MEDUSACOVEN or a lowercase domain).
    const covenMatches = line.match(/(?<![A-Z])COVEN(?![A-Z])/g);
    if (covenMatches) {
      violations.push(`${loc} — standalone "COVEN" brand string: ${line.trim()}`);
    }

    // Block actual integration code for low-risk processors (imports, SDKs,
    // script URLs) — prose like "Stripe is hard-blocked" in comments is fine.
    const processorCode =
      /(from\s+['"](@?stripe|@paypal|braintree)|require\(\s*['"](@?stripe|@paypal|braintree)|js\.stripe\.com|paypal\.com\/sdk|checkout\.stripe\.com|STRIPE_(SECRET|PUBLISHABLE)_KEY|PAYPAL_CLIENT_ID)/i;
    if (file.startsWith('apps/') && processorCode.test(line)) {
      violations.push(`${loc} — blocked low-risk processor integration: ${line.trim()}`);
    }
  });
}

if (violations.length > 0) {
  console.error('Brand/liability gate FAILED:\n');
  for (const v of violations) console.error(`  ${v}`);
  console.error(`\n${violations.length} violation(s). High-risk rails only; brand strings must stay clean.`);
  process.exit(1);
}

console.log(`Brand/liability gate passed (${files.length} files scanned).`);
