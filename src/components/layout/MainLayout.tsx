import { Grid, Layout, Menu, MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const items: MenuProps["items"] = [
  { key: "1", label: "Dashboard" },
  { key: "2", label: "User Management" },
  {
    key: "3",
    label: "Product Management",
    children: [
      { key: "31", label: "All Products" },
      { key: "32", label: "Create New Product" },
    ],
  },
  { key: "4", label: "Order Management" },
];
const { useBreakpoint } = Grid;

const MainLayout = () => {
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
          items={items}
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
            the main content here
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
