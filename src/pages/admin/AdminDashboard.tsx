import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllUserQuery } from "../../redux/features/user/user.api";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";

const AdminDashboard = () => {
  const { data: users, isLoading: isLoadingUsers } =
    useGetAllUserQuery(undefined);
  const { data: products, isLoading: isLoadingProducts } =
    useGetAllProductsQuery(undefined);
  const { data: orders, isLoading: isLoadingOrders } =
    useGetAllOrdersQuery(undefined);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Update state when data is fetched
  useEffect(() => {
    if (users) setTotalUsers(users?.data?.length ?? 0);
    if (products) setTotalProducts(products?.data?.length ?? 0);
    if (orders) setTotalOrders(orders?.data?.length ?? 0);
  }, [users, products, orders]);

  const loadingIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <h2 className="text-2xl text-center" style={{ marginBottom: "20px" }}>
        Admin Dashboard
      </h2>
      <Row gutter={[16, 16]} justify="center">
        {/* Total Users */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title="Total Users"
            bordered={false}
            loading={isLoadingUsers}
            extra={isLoadingUsers ? loadingIndicator : null}
            style={{ textAlign: "center" }}
          >
            <h3>{totalUsers}</h3>
          </Card>
        </Col>

        {/* Total Products */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title="Total Products"
            bordered={false}
            loading={isLoadingProducts}
            extra={isLoadingProducts ? loadingIndicator : null}
            style={{ textAlign: "center" }}
          >
            <h3>{totalProducts}</h3>
          </Card>
        </Col>

        {/* Total Orders */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title="Total Orders"
            bordered={false}
            loading={isLoadingOrders}
            extra={isLoadingOrders ? loadingIndicator : null}
            style={{ textAlign: "center" }}
          >
            <h3>{totalOrders}</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
