import { Outlet } from "react-router-dom";

const HomePageLayout = () => {
  return (
    <>
      <h2> This is Header</h2>

      <Outlet />
      <h2> This is footer</h2>
    </>
  );
};

export default HomePageLayout;
