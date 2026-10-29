#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://localhost:3000}"

printf 'Checking forged session is rejected by /checkout...\n'
status=$(curl --silent --show-error -o /dev/null -w '%{http_code}' -H 'Cookie: session=customer-1.fake' "$BASE_URL/checkout")
if [[ "$status" != "307" && "$status" != "302" ]]; then
  echo "FAIL: expected sign-in redirect (302/307), received HTTP $status"; exit 1
fi
printf 'PASS: forged session did not access checkout (HTTP %s).\n' "$status"

printf 'Checking unauthenticated order write...\n'
response_file=$(mktemp)
trap 'rm -f "$response_file"' EXIT
status=$(curl --silent --show-error -o "$response_file" -w '%{http_code}' -X POST "$BASE_URL/api/orders" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","address":"123 Test Street","items":[{"id":"1","quantity":1}]}')
if [[ "$status" != "401" ]] || ! grep -q 'UNAUTHENTICATED' "$response_file"; then
  echo "FAIL: expected HTTP 401 UNAUTHENTICATED, received HTTP $status"; cat "$response_file"; exit 1
fi
printf 'PASS: unauthenticated order write denied (HTTP 401).\n'
printf '\nAuth smoke checks passed. Open-redirect test still requires manual sign-in; see DAY14-ATTACKS.md.\n'
