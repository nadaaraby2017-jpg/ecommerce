import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routing } from "./Routing/Routing.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary.jsx";

// Global error handler for unhandled DOM errors
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('removeChild')) {
    console.warn('DOM removeChild error caught globally:', event.message);
    event.preventDefault();
    return true;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason);
});

const route = createBrowserRouter(routing);

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <WishlistContextProvider>
      <CartContextProvider>
        <RouterProvider router={route}>
          <App />
        </RouterProvider>
      </CartContextProvider>
    </WishlistContextProvider>
  </ErrorBoundary>
);
