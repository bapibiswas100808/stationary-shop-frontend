import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

type TproductCard = {
  image: string;
  title: string;
  description: string;
  button: string;
  price: number;
  category: string;
  id: string;
  stock: boolean;
};

const ProductCard = ({
  image,
  title,
  description,
  button,
  price,
  category,
  stock,
  id,
}: TproductCard) => {
  return (
    <Card
      style={{ maxHeight: "480px", backgroundColor: "#Ffffff" }}
      hoverable
      cover={
        <img
          alt="product"
          style={{ height: "250px", width: "100%", objectFit: "cover" }}
          src={image}
        />
      }
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "#F5E6E0",
          padding: "5px 10px",
          borderRadius: "5px",
          color: "green",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>${price}</p>
      </div>

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "80px",
          padding: "5px 10px",
          borderRadius: "5px",
          color: "white",
          backgroundColor: "green",
        }}
      >
        <span>{category}</span>
      </div>
      <div
        style={{
          position: "absolute",
          fontSize: "13px",
          top: "270px",
          right: "20px",
          padding: "0 10px",
          borderRadius: "15px",
          color: `${stock ? "green" : "red"}`,
          backgroundColor: "#eaeaea",
          boxShadow: "initial",
          fontWeight: "600",
        }}
      >
        {stock ? <span>In Stock</span> : <span>Out of Stock</span>}
      </div>

      <Meta
        style={{ height: "122px" }}
        title={title}
        description={description}
      />
      <Link to={`/singleProduct/${id}`}>
        <Button
          style={{
            marginTop: "20px",
            // backgroundColor: "green",
            color: "black",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {button}
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
