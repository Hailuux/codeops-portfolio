import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./components/AuthContext";
import { ThemeProvider } from "./components/ThemeContext";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteSkeleton from "./components/RouteSkeleton";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Menu from "./components/Menu";
import DishDetails from "./components/DishDetails";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";

const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./components/Receipt"));

function LazyRoute({ children, name }) {
  return (
    <ErrorBoundary
      name={name}
      title={`${name} could not be loaded`}
      message="The page could not be displayed. Please try again."
    >
      <Suspense fallback={<RouteSkeleton />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route
                path="menu"
                element={
                  <ErrorBoundary
                    name="Menu"
                    title="The menu is temporarily unavailable"
                    message="The menu encountered an error. You can still use other sections of ADDIS EATS."
                  >
                    <Menu />
                  </ErrorBoundary>
                }
              />

              <Route path="menu/:id" element={<DishDetails />} />

              <Route path="signin" element={<SignIn />} />

              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <LazyRoute name="Checkout">
                      <Checkout />
                    </LazyRoute>
                  </RequireAuth>
                }
              />

              <Route
                path="receipt/:orderId"
                element={
                  <RequireAuth>
                    <LazyRoute name="Receipt">
                      <Receipt />
                    </LazyRoute>
                  </RequireAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}