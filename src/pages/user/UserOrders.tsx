import { Card, Spin, Table, Typography, Tag } from "antd";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleOrderQuery } from "../../redux/features/order/orderApi";
import { useAppSelector } from "../../redux/hook";
import { TCartItem } from "../../types/globalResponse";

const { Title, Text } = Typography;

// Status colors mapping
const statusColors: Record<"pending" | "shipping" | "cancelled", string> = {
  pending: "orange",
  shipping: "blue",
  cancelled: "red",
};

const UserOrders = () => {
  const user = useAppSelector(useCurrentUser);
  const email = user?.email;
  const { data: orderDetails, isLoading } = useGetSingleOrderQuery(email);

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

  const orders = orderDetails?.data;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Orders
      </Title>

      {orders?.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No orders found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {[...orders].reverse().map((order) => (
            <Card
              key={order._id}
              style={{
                flex: "1 1 calc(50% - 20px)", // Two cards per row on lg+ screens
                minWidth: "300px", // Ensures single column on small screens
                maxWidth: "550px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <p
                className="text-xl lg:text-2xl"
                style={{ marginBottom: "10px" }}
              >
                Order ID: {order._id}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <Text strong>Status: </Text>
                  <Tag
                    color={
                      statusColors[
                        order.status as "pending" | "shipping" | "cancelled"
                      ] || "gray"
                    }
                  >
                    {order.status.toUpperCase()}
                  </Tag>
                  <br />
                  <Text strong>Total Price: </Text>
                  <Text style={{ color: "green" }}>${order.totalPrice}</Text>
                  <br />
                  <Text strong>Transaction Status: </Text>
                  <Text>{order.transaction?.transactionStatus}</Text>
                </div>

                <div>
                  <Text strong>Created At: </Text>
                  <Text>{new Date(order.createdAt).toLocaleString()}</Text>
                </div>
              </div>

              <Table
                style={{ marginTop: "10px", overflow: "scroll" }}
                dataSource={order.product?.cartItems?.map(
                  (item: TCartItem, index: number) => ({
                    key: item._id || index,
                    product: item.productId.name || "Unknown Product",
                    price: `$${item.price.toFixed(2)}`,
                    quantity: item.quantity,
                    subTotal: `$${item.subTotal.toFixed(2)}`,
                  })
                )}
                columns={[
                  { title: "Product", dataIndex: "product", key: "product" },
                  { title: "Price", dataIndex: "price", key: "price" },
                  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                  { title: "Subtotal", dataIndex: "subTotal", key: "subTotal" },
                ]}
                pagination={false}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
