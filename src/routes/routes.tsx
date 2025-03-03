import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePageLayout from "../components/layout/HomePageLayout";
import AboutPage from "../pages/AboutPage";
import AllProducts from "../pages/AllProducts";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import { routeGenerator } from "../utils/routeGenerator";
import SingleProduct from "../pages/SingleProduct";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import VerifyPayment from "../pages/VerifyPayment";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(userPaths),
  },
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/allProducts", element: <AllProducts /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/singleProduct/:id", element: <SingleProduct /> },
      { path: "/orders/verify", element: <VerifyPayment /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
