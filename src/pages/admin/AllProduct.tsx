import { useGetAllProductsQuery } from "../../redux/features/products/productApi";

const AllProduct = () => {
  const { data } = useGetAllProductsQuery(undefined);
  console.log(data);
  return (
    <div>
      <h2>This is All Product :{data?.data?.length}</h2>
    </div>
  );
};

export default AllProduct;
