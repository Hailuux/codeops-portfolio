# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## Day 7: State Management with Zustand and Context

### Cart: Zustand Store

The cart is managed by a Zustand store in `src/store/useCartStore.js`. It provides `items`, `addItem`, `remove`, and `clear`. Components use narrow selectors to subscribe only to the cart state or actions they need.

Zustand is appropriate for the cart because it is shared across distant components, needs to survive navigation and browser refreshes, and benefits from independent subscriptions without requiring a Context provider around the application. The `persist` middleware saves cart items to `localStorage` and restores them when the application reloads.

### Authentication: React Context

Authentication remains in `AuthContext.jsx` because the session and its operations form a separate application-level concern. The guarded `useAuth()` hook ensures that components access authentication only within `AuthProvider`.

The demo implementation stores a user object in `localStorage` to simulate a session. This is not secure authentication and must be replaced with a trusted authentication mechanism for production.

### Theme: Separate React Context

Theme state is managed by `ThemeContext.jsx`, with its own `ThemeProvider` and guarded `useTheme()` hook. Keeping theme separate from authentication avoids combining unrelated state and makes each context easier to maintain.

### Design Summary

- **Zustand:** shared, persistent cart state and cart actions.
- **Auth Context:** session state and authentication operations.
- **Theme Context:** visual preference and theme toggling.
- **Narrow selectors:** components subscribe only to the Zustand values they require.
- **Guarded hooks:** `useAuth()` and `useTheme()` detect missing providers.

