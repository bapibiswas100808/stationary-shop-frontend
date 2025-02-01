import { Button, Menu } from "antd";
import { Layout } from "antd";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Header = () => {
  const { Header } = Layout;
  const navOptions = [
    { key: 1, label: "Home", path: "/" },
    { key: 2, label: "All Products", path: "/allProducts" },
    { key: 3, label: "About Us", path: "/about" },
    { key: 4, label: "Dashboard", path: "/admin/dashboard" },
    { key: 5, label: "Cart", path: "/" },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="text-white">LOGO</div>

      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {navOptions.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </div>

      <div className="flex gap-5">
        <Button>Cart</Button>
        <Button>Register</Button>
        <Button>Login</Button>
      </div>
    </Header>
  );
};

export default Header;
