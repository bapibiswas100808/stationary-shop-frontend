import { useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../redux/features/order/orderApi";
import { Card, Spin, Row, Col } from "antd";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useVerifyOrderQuery(searchParams.get("order_id"));

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!data || data?.data?.length === 0) {
    return <div>No data found</div>;
  }

  const paymentData = data?.data[0];
  console.log(paymentData);

  return (
    <div
      className="max-w-[800px]"
      style={{ padding: "20px", margin: "0 auto" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Payment Information" bordered={false}>
            {/* First row: Success message */}
            <Row>
              <Col span={24}>
                <div
                  style={{
                    backgroundColor: "#dff0d8",
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "20px",
                  }}
                >
                  {paymentData?.bank_status === "Failed" ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Sorry! Your payment was not successful.
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "#3c763d",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Congratulations! Your payment was successful.
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            {/* Second row: Payment Information */}
            <Row gutter={[16, 16]}>
              <Col span={24} md={12}>
                <strong>Order ID:</strong> {paymentData.order_id}
              </Col>
              <Col span={24} md={12}>
                <strong>Customer Name:</strong> {paymentData.name}
              </Col>
              <Col span={24} md={12}>
                <strong>Email:</strong> {paymentData.email}
              </Col>
              <Col span={24} md={12}>
                <strong>Phone:</strong> {paymentData.phone_no}
              </Col>
              <Col span={24} md={12}>
                <strong>Amount:</strong> {paymentData.amount}{" "}
                {paymentData.currency}
              </Col>
              <Col span={24} md={12}>
                <strong>Payment Status:</strong> {paymentData.bank_status}
              </Col>
              <Col span={24} md={12}>
                <strong>Payment Method:</strong> {paymentData.method}
              </Col>
              <Col span={24} md={12}>
                <strong>Transaction ID:</strong> {paymentData.bank_trx_id}
              </Col>
              <Col span={24} md={12}>
                <strong>Payment Time:</strong> {paymentData.date_time}
              </Col>
              <Col span={24}>
                <strong>Address:</strong> {paymentData.address},{" "}
                {paymentData.city}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VerifyPayment;
