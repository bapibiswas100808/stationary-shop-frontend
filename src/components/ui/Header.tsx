import { useState } from "react";
import { Button, Menu, Drawer } from "antd";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const HeaderComponent = () => {
  const { Header } = Layout;
  const [visible, setVisible] = useState(false);

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
      <div className="text-[#222222] text-2xl font-bold">Elegant Shop</div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
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
        visible={visible}
      >
        <Menu mode="vertical">
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
