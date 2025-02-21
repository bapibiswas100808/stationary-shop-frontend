import { useState } from "react";
import { Button, Menu, Drawer } from "antd";
import { Layout } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const HeaderComponent = () => {
  const { Header } = Layout;
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  const navOptions = [
    { key: "/", label: "Home", path: "/" },
    { key: "/allProducts", label: "All Products", path: "/allProducts" },
    { key: "/about", label: "About Us", path: "/about" },
    { key: "/admin/dashboard", label: "Dashboard", path: "/admin/dashboard" },
    { key: "/cart", label: "Cart", path: "/cart" },
  ];

  return (
    <Header
      style={{
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#F5F5F5",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Logo */}
      <Link to="/">
        <span className="text-[#222222] text-2xl font-bold">Elegant Shop</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          {navOptions.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </div>

      {/* Buttons */}
      <div className="hidden lg:flex gap-3">
        <Button>Cart</Button>
        <Button>Register</Button>
        <Button>Login</Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Menu mode="vertical" selectedKeys={[location.pathname]}>
          {navOptions.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={item.path} onClick={() => setVisible(false)}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
        <div className="flex flex-col gap-3 mt-5">
          <Button block>Cart</Button>
          <Button block>Register</Button>
          <Button block>Login</Button>
        </div>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
