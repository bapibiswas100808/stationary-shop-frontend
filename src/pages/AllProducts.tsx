import { useState } from "react";
import { TQueryParams } from "../types/globalResponse";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import ProductCard from "../components/ui/ProductCard";

const AllProducts = () => {
  const [params] = useState<TQueryParams[] | undefined>(undefined);
  const { data: productData, isLoading } = useGetAllProductsQuery(params);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div style={{ marginBottom: "50px" }}>
      <div
        className="max-w-[1280px]"
        style={{ margin: "0 auto", padding: "0 10px" }}
      >
        <h2
          className="text-center text-3xl font-bold"
          style={{ margin: "50px 0" }}
        >
          All Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {productData?.data?.map((product, idx) => (
            <ProductCard
              key={idx}
              image={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              stock={product.inStock}
              button="See Details"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
