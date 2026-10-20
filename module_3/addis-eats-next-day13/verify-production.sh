#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${BASE_URL:-http://localhost:3000}"

printf '\n== GET /api/dishes ==\n'
curl --fail-with-body --silent --show-error -i "$BASE_URL/api/dishes"
printf '\n\n== GET /api/dishes/999 (expected 404) ==\n'
status=$(curl --silent --show-error -o /tmp/addis-eats-missing-dish.json -w '%{http_code}' "$BASE_URL/api/dishes/999")
cat /tmp/addis-eats-missing-dish.json
if [ "$status" != "404" ]; then echo "Expected 404, got $status"; exit 1; fi
printf '\n\n== POST /api/orders with invalid fields (expected 422) ==\n'
status=$(curl --silent --show-error -o /tmp/addis-eats-invalid-order.json -w '%{http_code}' -X POST "$BASE_URL/api/orders" -H 'Content-Type: application/json' -d '{"name":"","email":"bad","address":"","items":[]}')
cat /tmp/addis-eats-invalid-order.json
if [ "$status" != "422" ]; then echo "Expected 422, got $status"; exit 1; fi
printf '\n\nAPI smoke checks passed.\n'
