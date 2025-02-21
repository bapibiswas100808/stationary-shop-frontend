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
        <Content>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default HomePageLayout;
