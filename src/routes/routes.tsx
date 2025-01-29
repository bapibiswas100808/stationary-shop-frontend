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

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: adminPaths,
  },
  {
    path: "/user",
    element: <App />,
    children: userPaths,
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
    ],
  },
]);

export default router;
