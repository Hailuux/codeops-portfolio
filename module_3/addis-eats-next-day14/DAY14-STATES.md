# Day 14 — State inventory

| Area | States to verify | Expected visible behavior |
|---|---|---|
| Menu | loading, success, empty, error | Skeleton/loading UI, dish list, empty message, or recoverable error |
| Dish | found, missing ID | Detail page or not-found response |
| Cart | empty, populated, quantity changed | Empty guidance or accurate items/subtotal |
| Sign-in | idle, invalid credentials, success | Form, clear error, or redirect after valid sign-in |
| Checkout | signed out, invalid fields, pending, failure, success | Sign-in redirect, field errors, disabled submit, recoverable error, or confirmation |
| Orders | owned, missing, not owned | Owner-only details; no disclosure of another user's order |
| Tracking | initial, live update, stream unavailable | Current status, updates, or understandable fallback |
| Staff | signed out, customer role, staff role | Sign-in redirect, access denied/redirect, or staff dashboard |
| API | valid, invalid JSON, invalid schema, unauthenticated, missing resource | Appropriate 2xx, 400, 422, 401, or 404 response |

Test states manually on desktop and a narrow phone viewport. This is an inventory/checklist, not a claim that every state has been independently exercised. Order persistence is in-memory in this coursework app and is lost on process restart.
