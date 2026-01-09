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
  const errorMessage = event.message || '';
  if (errorMessage.includes('removeChild') || 
      errorMessage.includes('appendChild') ||
      errorMessage.includes('Node') ||
      errorMessage.includes('DOM')) {
    console.warn('DOM manipulation error caught and prevented:', errorMessage);
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection caught:', event.reason);
  event.preventDefault();
});

// Override console.error to catch React errors
const originalConsoleError = console.error;
console.error = (...args) => {
  const errorString = args.join(' ');
  if (errorString.includes('removeChild') || 
      errorString.includes('appendChild') ||
      errorString.includes('Node')) {
    console.warn('Console error intercepted:', errorString);
    return;
  }
  originalConsoleError.apply(console, args);
};

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
