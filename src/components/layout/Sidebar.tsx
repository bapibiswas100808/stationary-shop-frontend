import { Grid, Menu, Layout } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const { useBreakpoint } = Grid;
const Sidebar = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  let sidebarItems;

  switch (user.role) {
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
  const isMobile = screens.xs || screens.sm;
  return (
    <Sider
      style={{
        backgroundColor: "#006400",
        position: isMobile ? "fixed" : "relative",
        zIndex: isMobile ? 100 : "auto",
        top: 0,
        bottom: 0,
        width: isMobile ? "auto" : "200px",
        height: "100vh",
        transition: "0.3s",
      }}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Link to="/">
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
          Elegant Shop
        </div>
      </Link>
      <Menu
        style={{ backgroundColor: "#006400" }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
