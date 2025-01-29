import { Grid, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { adminOptions } from "../../routes/admin.routes";
// import { userOptions } from "../../routes/user.routes";

const { Header, Content, Footer, Sider } = Layout;

const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const screens = useBreakpoint();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            width: "100%", // Ensures it fits within the sidebar
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: screens.xs ? "1.2rem" : "1.5rem",
            fontWeight: "700",
            overflow: "hidden", // Prevents text from overflowing
            whiteSpace: "nowrap",
          }}
        >
          Stationary Shop
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={adminOptions}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
