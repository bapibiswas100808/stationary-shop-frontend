import { Button, Spin } from "antd";
import Banner from "../components/ui/Banner";
import ProductCard from "../components/ui/ProductCard";
import TestimonialSlider from "../components/ui/TestimonialSlider";
import { TQueryParams } from "../types/globalResponse";
import { useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [params] = useState<TQueryParams[] | undefined>(undefined);
  const { data: productData, isLoading } = useGetAllProductsQuery(params);

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
  return (
    <div>
      <Banner />

      {/* Featured products */}
      <div
        className="max-w-[1280px]"
        style={{ margin: "0 auto", padding: "0 10px" }}
      >
        <h2
          className="text-center text-3xl font-bold"
          style={{ margin: "50px 0" }}
        >
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {productData?.data?.slice(0, 6).map((product, idx) => (
            <ProductCard
              key={idx}
              image={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              stock={product.inStock}
              id={product._id}
              button="See Details"
            />
          ))}
        </div>
        <div className="flex justify-center" style={{ margin: "50px 0" }}>
          <Link to="/allProducts">
            <Button style={{ padding: "10px 20px" }}> See All Products</Button>
          </Link>
        </div>
      </div>

      {/* Testimonial */}
      <TestimonialSlider />
    </div>
  );
};

export default HomePage;
