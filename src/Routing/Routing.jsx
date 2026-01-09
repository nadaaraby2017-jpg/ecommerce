import UserContextProvider from "../Context/UserContext";
import Cart from "../pages/cart/Cart";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Layout from "../pages/layout/Layout";
import ProtectedRoutes from "../component/protectedRoutes/ProtectedRoutes";
import Wishlist from "../pages/wishlist/Wishlist";
import ProductDetails from "../component/ProductDetails/ProductDetails";
import Categories from "../pages/categories/Categories";
import Brands from "../pages/brands/Brands";
import Login from "../pages/Auth/login/Login";
import ProtectedAuthRoutes from "../component/protectedRoutes/ProtectedAuthRoutes";
import Register from "../pages/Auth/register/Register";
import CheckOut from "../pages/CheckOut/CheckOut";
import Orders from "../pages/Orders/Orders";
import VerifyCode from "../pages/Auth/Verifycode/VerifyCode";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword';
import Error from '../pages/error/Error';
import ErrorBoundary from "../component/ErrorBoundary/ErrorBoundary";

export const routing = [
  {
    path: "/",
    element: (
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "home",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "cart",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "products",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "categories",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "brands",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "checkout",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "allorders",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "login",
        element: (
          <ErrorBoundary>
            <ProtectedAuthRoutes>
              <Login />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <ErrorBoundary>
            <ProtectedAuthRoutes>
              <ForgetPassword />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "verifyCode",
        element: (
          <ErrorBoundary>
            <ProtectedAuthRoutes>
              <VerifyCode />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "resetpassword",
        element: (
          <ErrorBoundary>
            <ProtectedAuthRoutes>
              <ResetPassword />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "register",
        element: (
          <ErrorBoundary>
            <ProtectedAuthRoutes>
              <Register />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "*",
        element: (
          <ErrorBoundary>
            <ProtectedRoutes>
              <Error />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
    ],
  },
];
