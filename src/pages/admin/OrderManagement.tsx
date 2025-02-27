/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";
import { Button, Table, Popconfirm, Card, Row, Col } from "antd";
import { toast } from "sonner";

// Local Types for Order Management Page

export type TCartItem = {
  _id: string;
  productId: {
    name: string;
  };
  quantity: number;
  price: number;
  subTotal: number;
};

const OrderManagement = () => {
  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery(undefined);

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // Explicit fallback for undefined
  const orders = Array.isArray(allOrders?.data) ? allOrders.data : [];

  const handleChangeStatus = async (orderId: string) => {
    try {
      const res = await updateOrderStatus(orderId).unwrap();
      toast.success(`Order status updated`);
      console.log(res?.data);
      refetch();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const res = await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
      console.log(res.data);
      refetch();
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (subTotal: number) => `$${subTotal}`,
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl text-center" style={{ marginBottom: "20px" }}>
        Order Management
      </h2>
      <Row gutter={[16, 16]}>
        {orders.map((order) => (
          <Col xs={24} lg={12} key={order._id}>
            <Card
              style={{ padding: "20px 0" }}
              title={
                <div>
                  <div>
                    <strong>Email:</strong> {order.email}
                    <br />
                    <strong>Status:</strong>
                    <span
                      style={{
                        color:
                          order.status === "pending"
                            ? "orange"
                            : order.status === "shipping"
                            ? "blue"
                            : "red",
                        marginLeft: "5px",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  {/* <div>
                    <strong>Order History:</strong>
                    {order.isDeleted === true ? "Deleted" : "Active"}
                  </div> */}
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleChangeStatus(order._id)}
                  style={{ marginRight: "8px" }}
                >
                  Approve Order
                </Button>,
                <Popconfirm
                  title="Are you sure to delete this order?"
                  onConfirm={() => handleDeleteOrder(order._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>,
              ]}
            >
              <Table
                style={{ overflow: "scroll" }}
                columns={columns}
                dataSource={order.product?.cartItems?.map(
                  (item: TCartItem) => ({
                    key: item._id,
                    name: item?.productId?.name,
                    quantity: item?.quantity,
                    price: item?.price,
                    subTotal: item?.subTotal,
                  })
                )}
                pagination={false}
                size="small"
              />
              <div style={{ marginTop: "10px" }}>
                <strong>Total Price:</strong> ${order.product?.totalPrice}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderManagement;
