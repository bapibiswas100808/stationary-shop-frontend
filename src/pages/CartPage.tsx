import { Card, Table, Typography, Spin, Button } from "antd";
import { useGetAllCartsQuery } from "../redux/features/cart/cartApi";
import { TCart, TCartItem, TProduct } from "../types/globalResponse";

const { Title, Text } = Typography;

const CartPage = () => {
  const { data, isLoading } = useGetAllCartsQuery(undefined);

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: 50 }}
      />
    );
  }

  const cartData: TCart | undefined = data?.data;
  const user = cartData?.user || {
    name: "N/A",
    email: "N/A",
    phone: "N/A",
    address: "N/A",
  };
  const cartItems: TCartItem[] = cartData?.cart?.cartItems || [];
  console.log(cartData);
  const totalPrice: number = cartData?.cart?.totalPrice || 0;

  // Table columns
  const columns = [
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (product: TProduct) => product?.name || "Unknown Product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (subTotal: number) => `$${subTotal.toFixed(2)}`,
    },
  ];

  // Handle Proceed to Payment
  const handleProceedToPay = () => {
    console.log("Proceeding to Payment...");
    alert("Redirecting to Payment Page...");
    // Navigate to payment page or perform an API call
  };

  return (
    <div style={{ maxWidth: 1280, margin: "20px auto", padding: 20 }}>
      {/* User Details */}
      <Card style={{ marginBottom: 20 }}>
        <Title level={3}>User Details</Title>
        <Text strong>Name:</Text> <Text>{user.name}</Text> <br />
        <Text strong>Email:</Text> <Text>{user.email}</Text> <br />
        <Text strong>Phone:</Text> <Text>{user.phone}</Text> <br />
        <Text strong>Address:</Text> <Text>{user.address}</Text>
      </Card>

      {/* Cart Table */}
      <Card style={{ overflow: "scroll" }}>
        <Title level={3}>Shopping Cart</Title>
        <Table
          dataSource={cartItems.map((item) => ({ key: item._id, ...item }))}
          columns={columns}
          pagination={false}
        />
      </Card>

      {/* Total Price & Proceed to Pay */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title level={4}>Total Price: ${totalPrice.toFixed(2)}</Title>
        </div>
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          size="large"
          onClick={handleProceedToPay}
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
