import UserDetails from "../pages/user/UserDetails";
import UserOrders from "../pages/user/UserOrders";

export const userPaths = [
  { name: "Profile", path: "dashboard", element: <UserDetails /> },
  { name: "Orders", path: "userOrder", element: <UserOrders /> },
];
