import { Button, Spin, Table, TableColumnsType, TableProps } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/features/products/productApi";
import { useEffect, useState } from "react";
import { TQueryParams } from "../../types/globalResponse";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  inStock: boolean;
};

const AllProduct = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const {
    data: productData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllProductsQuery(params);
  console.log(productData);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const tableData = productData?.data?.map(
    ({ _id, name, brand, category, price, quantity, inStock }) => ({
      key: _id,
      name,
      brand,
      category,
      price,
      quantity,
      inStock,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      render: (inStock: boolean) => (inStock ? "In Stock" : "Out of Stock"),
    },
    {
      title: "AVailability",
      dataIndex: "isDeleted",
      render: (isDeleted: boolean) => (isDeleted ? "Deleted" : "Existed"),
    },
    {
      title: "Action",
      render: (item) => {
        console.log(item);
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={`/admin/products/${item.key}`}>
              <Button style={{ backgroundColor: "green", color: "white" }}>
                Update
              </Button>
            </Link>
            <Button
              onClick={() => handleDeleteProduct(item.key)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.category?.forEach((item) =>
        queryParams.push({ name: "category", value: item })
      );
      setParams(queryParams);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const toastId = toast.loading("Deleting Product");
    try {
      const response = await deleteProduct(id).unwrap();
      console.log(response);
      toast.success("product deleted succesfully", {
        id: toastId,
        duration: 2000,
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast.success("product created succesfully", {
        id: toastId,
        duration: 2000,
      });
    }
  };

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
    <div className="">
      <h2 style={{ textAlign: "center", padding: "20px 0" }}>All Products</h2>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        scroll={{ x: "max-content", y: 400 }}
      />
    </div>
  );
};

export default AllProduct;
