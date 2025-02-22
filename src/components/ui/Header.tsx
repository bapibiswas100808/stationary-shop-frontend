import { useState } from "react";
import { Button, Menu, Drawer } from "antd";
import { Layout } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { CiShoppingCart } from "react-icons/ci";
import { useGetAllCartsQuery } from "../../redux/features/cart/cartApi";
import { TQueryParams } from "../../types/globalResponse";

const HeaderComponent = () => {
  const [params] = useState<TQueryParams[] | undefined>(undefined);
  const { Header } = Layout;
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { data: cartData, isLoading } = useGetAllCartsQuery(params);

  const navOptions = [
    { key: "/", label: "Home", path: "/" },
    { key: "/allProducts", label: "All Products", path: "/allProducts" },
    { key: "/about", label: "About Us", path: "/about" },
    { key: "/admin/dashboard", label: "Dashboard", path: "/admin/dashboard" },
  ];

  if (isLoading) {
    return <p>Loading ...</p>;
  }

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
        <span className="text-green-700 text-3xl font-bold">Elegant Shop</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-6 bg-gray-100 p-4">
        {navOptions.map((item) => (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "green" : "gray",
              fontWeight: isActive ? "bold" : "normal",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
              fontSize: "16px",
            })}
            key={item.key}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center relative">
        <Link to="/cart">
          <CiShoppingCart className="text-3xl" />
        </Link>
        <span
          style={{
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            height: "25px",
            borderRadius: "50%",
          }}
          className="text-white"
        >
          {cartData?.data?.cart?.cartItems?.length
            ? cartData?.data?.cart?.cartItems?.length
            : "0"}
        </span>
      </div>

      {/* Buttons */}
      <div className="hidden lg:flex gap-3 items-center">
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
          <Button block>Register</Button>
          <Button block>Login</Button>
        </div>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
