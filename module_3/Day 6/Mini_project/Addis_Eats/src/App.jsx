
import { createContext, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Menu from "./components/Menu";
import DishDetails from "./components/DishDetails";
import SignIn from "./components/SignIn";
import Checkout from "./components/Checkout";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./components/AuthContext";

export const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "Add to Cart":
      if (state.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];

    case "Remove from Cart":
      return state.filter((item) => item.id !== action.payload.id);

    case "Clear Cart":
      return [];

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetails />} />
              <Route path="signin" element={<SignIn />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
