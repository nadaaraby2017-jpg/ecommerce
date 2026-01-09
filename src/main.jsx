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

// Ultra-aggressive global error handler for DOM manipulation
(function() {
  // Store original methods
  const originalRemoveChild = Node.prototype.removeChild;
  const originalAppendChild = Node.prototype.appendChild;
  const originalInsertBefore = Node.prototype.insertBefore;
  const originalReplaceChild = Node.prototype.replaceChild;
  
  // Override DOM methods to catch errors
  Node.prototype.removeChild = function(child) {
    try {
      if (!child || !this.contains(child)) {
        console.warn('Prevented invalid removeChild operation');
        return child;
      }
      return originalRemoveChild.call(this, child);
    } catch (error) {
      console.warn('removeChild error caught:', error.message);
      return child;
    }
  };
  
  Node.prototype.appendChild = function(child) {
    try {
      return originalAppendChild.call(this, child);
    } catch (error) {
      console.warn('appendChild error caught:', error.message);
      return child;
    }
  };
  
  Node.prototype.insertBefore = function(newNode, referenceNode) {
    try {
      return originalInsertBefore.call(this, newNode, referenceNode);
    } catch (error) {
      console.warn('insertBefore error caught:', error.message);
      return newNode;
    }
  };
  
  Node.prototype.replaceChild = function(newChild, oldChild) {
    try {
      return originalReplaceChild.call(this, newChild, oldChild);
    } catch (error) {
      console.warn('replaceChild error caught:', error.message);
      return newChild;
    }
  };
})();

// Enhanced global error handler for unhandled DOM errors
window.addEventListener('error', (event) => {
  const errorMessage = event.message || '';
  const errorString = errorMessage.toString().toLowerCase();
  
  // Catch all DOM manipulation errors
  if (errorString.includes('removechild') || 
      errorString.includes('appendchild') ||
      errorString.includes('node') ||
      errorString.includes('dom') ||
      errorString.includes('failed to execute') ||
      errorString.includes('not a child of this node')) {
    console.warn('DOM manipulation error caught and prevented:', errorMessage);
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return true;
  }
});

// Enhanced promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection caught:', event.reason);
  event.preventDefault();
  
  // Check if it's a DOM-related promise rejection
  if (event.reason && typeof event.reason === 'string') {
    const reasonString = event.reason.toString().toLowerCase();
    if (reasonString.includes('removechild') || reasonString.includes('node')) {
      console.warn('DOM-related promise rejection intercepted');
      return true;
    }
  }
});

// Enhanced console.error override
const originalConsoleError = console.error;
console.error = (...args) => {
  const errorString = args.join(' ').toString().toLowerCase();
  
  // Intercept DOM manipulation errors
  if (errorString.includes('removechild') || 
      errorString.includes('appendchild') ||
      errorString.includes('node') ||
      errorString.includes('failed to execute')) {
    console.warn('Console error intercepted:', errorString);
    return;
  }
  
  // Call original for non-DOM errors
  originalConsoleError.apply(console, args);
};

// Add window.onerror for additional safety
window.onerror = function(message, source, lineno, colno, error) {
  const errorMessage = message.toString().toLowerCase();
  
  if (errorMessage.includes('removechild') || 
      errorMessage.includes('appendchild') ||
      errorMessage.includes('node') ||
      errorMessage.includes('failed to execute')) {
    console.warn('Window error caught:', message);
    return true; // Prevent default error handling
  }
  
  return false; // Let default error handling handle other errors
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
