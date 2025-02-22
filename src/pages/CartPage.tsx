import { useState } from "react";
import { TQueryParams } from "../types/globalResponse";
import { useGetAllCartsQuery } from "../redux/features/cart/cartApi";

const CartPage = () => {
  const [params] = useState<TQueryParams[] | undefined>(undefined);
  const { data: cartData, isLoading } = useGetAllCartsQuery(params);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  console.log("cart", cartData?.data?.cart?.cartItems);

  return (
    <div>
      <h2>this is cart {cartData?.data?.cart?.cartItems?.length}</h2>
    </div>
  );
};

export default CartPage;
