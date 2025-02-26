import { Button, Grid, Layout } from "antd";
import { Link, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const isMobile = screens.xs;
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout style={{ marginLeft: `${isMobile ? "0px" : "200px"}` }}>
        <Header
          style={{
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Link to="/">
            <h2 className="text-2xl font-bold text-green-700 md:hidden">
              Elegant Shop
            </h2>
          </Link>
          <Button onClick={handleLogOut}>Log Out</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
