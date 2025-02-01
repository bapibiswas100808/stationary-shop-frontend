import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

const { Content } = Layout;
const HomePageLayout = () => {
  return (
    <>
      <Layout>
        <Header />
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 380,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default HomePageLayout;
