import { useState } from "react";
import { TQueryParams } from "../types/globalResponse";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import ProductCard from "../components/ui/ProductCard";
import { Checkbox, Input, Select, Slider, Spin } from "antd";

const { Option } = Select;
const AllProducts = () => {
  const [params] = useState<TQueryParams[] | undefined>(undefined);
  const { data: productData, isLoading } = useGetAllProductsQuery(params);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState<number>(1000000);
  const [availabilityFilter, setAvailabilityFilter] = useState(false);

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

  // Filter products based on selected filters
  const filteredProducts = productData?.data?.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categoryFilter || product.category.toLowerCase() === categoryFilter;

    // Price range
    const matchesPrice = product.price <= priceRange;

    const matchesAvailability = !availabilityFilter || product.inStock;

    return (
      matchesSearch && matchesCategory && matchesPrice && matchesAvailability
    );
  });
  const handlePriceChange = (value: number) => {
    setPriceRange(value);
  };

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
        <div className="flex flex-col lg:flex-row gap-5 min-h-screen">
          <div className="lg:w-1/4 w-full">
            <div className=" lg:sticky lg:top-[20px] bg-white shadow-md p-4 rounded-md">
              <div
                style={{
                  background: "#fff",
                  minWidth: "250px",
                  borderRadius: "12px",
                }}
              >
                {/* Sidebar Content */}
                <div style={{ padding: "20px" }}>
                  <h3>Filters</h3>
                  <Input
                    placeholder="Search by name, category ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <h4>Price Range (Up to)</h4>
                  {/* Clickable slider range */}
                  <Slider
                    min={0}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onChange={handlePriceChange}
                    marks={{
                      1000: "1000",
                      2000: "2000",
                      3000: "3000",
                      5000: "5000",
                    }}
                    style={{ marginBottom: "30px" }}
                  />
                  <h4>Category</h4>
                  <Select
                    value={categoryFilter}
                    onChange={(value) => setCategoryFilter(value)}
                    style={{ width: "100%", marginBottom: "20px" }}
                  >
                    <Option value={undefined}>All Categories</Option>
                    <Option value="technology">Technology</Option>
                    <Option value="office supplies">Office Supplies</Option>
                    <Option value="art supplies">Art Supplies</Option>
                    <Option value="writing">Writing</Option>
                    <Option value="educational">Educational</Option>
                    {/* Add more categories as needed */}
                  </Select>
                  <h4>Availability</h4>
                  <Checkbox
                    checked={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.checked)}
                  >
                    In Stock
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>

          {filteredProducts?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts?.map((product, idx) => (
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
          ) : (
            <div className="">
              <h2 className="text-2xl text-center">
                No Products Match youre Search!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
