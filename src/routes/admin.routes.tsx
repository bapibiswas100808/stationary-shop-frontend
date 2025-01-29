import AdminDashboard from "../pages/admin/AdminDashboard";
import AllProduct from "../pages/admin/AllProduct";
import CreateProduct from "../pages/admin/CreateProduct";
import OrderManagement from "../pages/admin/OrderManagement";
import UserManagement from "../pages/admin/UserManagement";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    path: "userManagement",
    element: <UserManagement />,
  },
  {
    name: "Order Management",
    path: "orderManagement",
    element: <OrderManagement />,
  },
  {
    name: "Product Management",
    children: [
      {
        name: "All Products",
        path: "allProducts",
        element: <AllProduct />,
      },
      {
        name: "Create Product",
        path: "createProduct",
        element: <CreateProduct />,
      },
    ],
  },
];

// export const adminOptions = adminPaths.reduce((acc: TSidebarItems[], item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//     });
//   }

//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//       })),
//     });
//   }
//   return acc;
// }, []);

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);
