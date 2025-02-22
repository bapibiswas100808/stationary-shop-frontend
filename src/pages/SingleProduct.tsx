/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

// import { FaRegHeart } from "react-icons/fa";
// import { GoShareAndroid } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/products/productApi";
import { useAppDispatch } from "../redux/hook";
import { useAddToCartMutation } from "../redux/features/cart/cartApi";
import { setCart } from "../redux/features/cart/cartSlice";
import { toast } from "sonner";

const SingleProduct = () => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const [addToCart] = useAddToCartMutation();
  const { id } = useParams();
  const { data: productData, isLoading } = useGetSingleProductQuery(id);
  const cartData = {
    quantity: count,
    productId: productData?.data?._id,
    price: productData?.data?.price,
  };
  const addProductToCart = async () => {
    const toastId = toast.loading("Adding to Cart");
    try {
      const res = await addToCart(cartData).unwrap();
      dispatch(setCart(res));
      toast.success("Added to cart Succesfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      const res = await addToCart(cartData).unwrap();
      toast.error(`${res.message}`, { id: toastId, duration: 2000 });
    }
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div style={{ padding: "50px 10px" }}>
      <h2
        className="text-center text-3xl font-bold"
        style={{ margin: "50px 0" }}
      >
        Category:{" "}
        <span className="text-green-700 font-semibold">
          {productData?.data?.category}
        </span>
      </h2>
      {/* Product Section */}
      <div
        className="flex flex-col lg:flex-row flex-wrap items-center"
        style={{
          gap: "50px",
        }}
      >
        {/* Image */}
        <div className="flex justify-end items-center" style={{ flex: 1 }}>
          <img
            src={productData?.data.image}
            alt="Product"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "15px",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: "26px", fontWeight: "500" }}>
            {productData?.data?.name}
          </h2>
          <h2 style={{ fontSize: "20px", fontWeight: "500" }}>
            Brand:{" "}
            <span
              style={{ fontSize: "18px", fontWeight: "500", color: "gray" }}
            >
              {productData?.data?.brand}
            </span>
          </h2>
          <div className="flex gap-5 items-center" style={{ margin: "10px 0" }}>
            <div
              style={{
                fontSize: "13px",
                padding: "3px 10px",
                borderRadius: "15px",
                color: `${productData?.data.inStock ? "white" : "red"}`,
                backgroundColor: "green",
                boxShadow: "initial",
                fontWeight: "600",
              }}
            >
              {productData?.data.inStock ? (
                <span>In Stock</span>
              ) : (
                <span>Out of Stock</span>
              )}
            </div>
            <div
              style={{
                fontSize: "13px",
                padding: "3px 10px",
                borderRadius: "15px",
                color: `${productData?.data?.quantity > 0 ? "white" : "red"}`,
                backgroundColor: "green",
                boxShadow: "initial",
                fontWeight: "600",
              }}
            >
              {productData?.data?.quantity ? (
                <span>Quantity: {productData?.data?.quantity}</span>
              ) : (
                <span>Out of Stock</span>
              )}
            </div>
          </div>

          <h3
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "black",
              margin: "10px 0",
            }}
          >
            Unit Price:
            <span
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "gray",
                marginLeft: "10px",
              }}
            >
              ${productData?.data?.price}
            </span>
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#666",
              maxWidth: "500px",
            }}
          >
            {productData?.data?.description}
          </p>

          {/* Count Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
            >
              <button
                onClick={() => setCount(count > 0 ? count - 1 : 0)}
                style={{
                  padding: "10px 15px",
                  background: "green",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {count <= productData?.data.quantity
                  ? count
                  : "You have selected All products Already"}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                style={{
                  padding: "10px 15px",
                  background: "green",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            <button
              disabled={count > productData?.data?.quantity || count < 1}
              onClick={addProductToCart}
              style={{
                padding: "12px 40px",
                background:
                  count > productData.data?.quantity || count < 1
                    ? "gray"
                    : "green",
                cursor:
                  count > productData.data?.quantity || count < 1
                    ? "not-allowed"
                    : "pointer",
                color: "white",
                borderRadius: "5px",
                textTransform: "uppercase",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Add to cart
            </button>
          </div>
          {/* <div style={{ display: "flex", gap: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaRegHeart />
              <span style={{ fontSize: "14px", textTransform: "uppercase" }}>
                Add to Wishlist
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GoShareAndroid />
              <span style={{ fontSize: "14px", textTransform: "uppercase" }}>
                Share
              </span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Description Section */}
      <div style={{ maxWidth: "1280px", margin: "100px auto" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "500",
            textTransform: "uppercase",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Description
        </h2>
        <h3
          style={{ fontSize: "16px", fontWeight: "500", marginBottom: "15px" }}
        >
          {productData?.data?.name}
        </h3>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#666" }}>
          {productData?.data?.description}
        </p>

        {/* Lists */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={{ textAlign: "left", maxWidth: "400px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "15px",
              }}
            >
              Why choose our product?
            </h2>
            <ul
              style={{
                fontSize: "14px",
                lineHeight: "2",
                listStyle: "inside",
                listStyleType: "revert",
              }}
            >
              <li>Created with love and care</li>
              <li>Simple, configurable (e.g., size, color), bundled</li>
              <li>Downloadable/Digital Products, Virtual Products</li>
            </ul>
          </div>

          <div style={{ textAlign: "left", maxWidth: "400px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "15px",
              }}
            >
              Simple Task List
            </h2>
            <ol
              style={{
                fontSize: "14px",
                lineHeight: "2",
                listStyle: "inside",
                listStyleType: "revert",
              }}
            >
              <li>Create store-specific orders</li>
              <li>Simple payment system </li>
              <li>Downloadable/Digital Products, Virtual Products</li>
            </ol>
          </div>
        </div>

        {/* <div style={{ marginTop: "30px" }}>
          <h2
            style={{ fontSize: "16px", fontWeight: "500", marginBottom: "5px" }}
          >
            Lining
          </h2>
          <p style={{ fontSize: "14px" }}>
            100% Polyester, Main: 100% Polyester.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SingleProduct;
