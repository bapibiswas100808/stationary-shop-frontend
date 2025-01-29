import { Grid, Menu, Layout } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const { useBreakpoint } = Grid;
const Sidebar = () => {
  const role = "user";
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
    default:
      break;
  }
  const screens = useBreakpoint();
  return (
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
          width: "100%",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: screens.xs ? "1.2rem" : "1.5rem",
          fontWeight: "700",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Stationary Shop
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
