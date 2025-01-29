import { NavLink } from "react-router-dom";
import UserDetails from "../pages/user/UserDetails";
import UserOrders from "../pages/user/UserOrders";
import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};
type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

export const userPaths = [
  { name: "Profile", path: "userDashboard", element: <UserDetails /> },
  { name: "Orders", path: "userOrder", element: <UserOrders /> },
];

export const userRoutes = userPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  //   if (item.children) {
  //     item.children.forEach((child) => {
  //       acc.push({
  //         path: child.path,
  //         element: child.element,
  //       });
  //     });
  //   }
  return acc;
}, []);

export const userOptions = userPaths.reduce((acc: TSidebarItems[], item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/user/${item.path}`}>{item.name}</NavLink>,
    });
  }

  // if (item.children) {
  //   acc.push({
  //     key: item.name,
  //     label: item.name,
  //     children: item.children.map((child) => ({
  //       key: child.name,
  //       label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
  //     })),
  //   });
  // }
  return acc;
}, []);
