import { useState } from "react";
import { Button, Menu, Drawer, Spin } from "antd";
import { Layout } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { CiShoppingCart } from "react-icons/ci";
import { useGetAllCartsQuery } from "../../redux/features/cart/cartApi";
import { TQueryParams } from "../../types/globalResponse";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logOut,
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";

const HeaderComponent = () => {
  const [params] = useState<TQueryParams[] | undefined>(undefined);
  const { Header } = Layout;
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { data: cartData, isLoading, refetch } = useGetAllCartsQuery(params);
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const navOptions = [
    { key: "/", label: "Home", path: "/" },
    { key: "/allProducts", label: "All Products", path: "/allProducts" },
    { key: "/about", label: "About Us", path: "/about" },
  ];
  if (token) {
    navOptions.push({
      key: "/admin/dashboard",
      label: "Dashboard",
      path: `/${user?.role}/dashboard`,
    });
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  const handleLogOut = () => {
    dispatch(logOut());
    refetch();
  };

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
        <span className="text-green-700 text-2xl md:text-3xl font-bold">
          Elegant Shop
        </span>
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
      {!token ? (
        <div className="lg:flex gap-3 mt-5 hidden">
          <Link to="/register">
            <Button block>Register</Button>
          </Link>
          <Link to="/login">
            <Button block>Login</Button>
          </Link>
        </div>
      ) : (
        <div className="lg:flex gap-3 mt-5 hidden">
          <Button onClick={handleLogOut} block>
            Log Out
          </Button>
        </div>
      )}

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
        {!token ? (
          <div className="flex gap-3 mt-5">
            <Link to="/register">
              <Button block>Register</Button>
            </Link>
            <Link to="/login">
              <Button block>Login</Button>
            </Link>
          </div>
        ) : (
          <div className="gap-3 mt-5">
            <Button onClick={handleLogOut} block>
              Log Out
            </Button>
          </div>
        )}
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
