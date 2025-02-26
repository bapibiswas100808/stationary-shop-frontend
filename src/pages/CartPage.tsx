import { Card, Table, Typography, Spin, Button } from "antd";
import { useGetAllCartsQuery } from "../redux/features/cart/cartApi";
import { TCart, TCartItem, TProduct } from "../types/globalResponse";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";

const { Title, Text } = Typography;

const CartPage = () => {
  const [createOrder] = useCreateOrderMutation();
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
  const handleProceedToPay = async () => {
    try {
      const toastId = toast.loading("Processing Your Order");
      const res = await createOrder({}).unwrap();
      if (res.error) {
        toast.error(`${res.error.data.message}`);
      }
      if (res.success) {
        toast.success("Proceeding to Pay!", {
          id: toastId,
          duration: 2000,
        });
        const url = res?.data?.payment?.checkout_url;
        window.location.href = url;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("someting went wrong");
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-5"
      style={{
        maxWidth: 1280,
        margin: "20px auto",
        padding: 20,
      }}
    >
      {/* User Details */}
      <Card
        className="w-full h-[300px] lg:w-[300px]"
        style={{ marginBottom: 20 }}
      >
        <Title level={3}>User Details</Title>
        <Text strong>Name:</Text> <Text>{user.name}</Text> <br />
        <Text strong>Email:</Text> <Text>{user.email}</Text> <br />
        <Text strong>Phone:</Text> <Text>{user.phone}</Text> <br />
        <Text strong>Address:</Text> <Text>{user.address}</Text>
      </Card>

      {/* Cart Table */}
      <Card className="flex-1 min-h-[80vh]" style={{ overflow: "scroll" }}>
        <Title level={3}>Shopping Cart</Title>
        <Table
          dataSource={cartItems.map((item) => ({ key: item._id, ...item }))}
          columns={columns}
          pagination={false}
        />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 className="text-xl lg:text-2xl">
              Total Price: ${totalPrice.toFixed(2)}
            </h2>
          </div>
          <Button
            style={{ backgroundColor: "green", color: "white" }}
            size="large"
            onClick={handleProceedToPay}
            disabled={totalPrice <= 0}
          >
            Order Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CartPage;
