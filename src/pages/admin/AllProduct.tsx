import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { useState } from "react";
import { TQueryParams } from "../../types/globalResponse";
import { Link } from "react-router-dom";

export type TTableData = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  inStock: boolean;
};

const AllProduct = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(params);

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
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
        },
      ],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Category",
      dataIndex: "category",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Educational",
          value: "Educational",
        },
        {
          text: "Technology",
          value: "Technology",
        },
        {
          text: "Office Supplies",
          value: "Office Supplies",
        },
        {
          text: "Art Supplies",
          value: "Art Supplies",
        },
        {
          text: "Writing",
          value: "Writing",
        },
      ],
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
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
            <Button style={{ backgroundColor: "red", color: "white" }}>
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
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <h2 style={{ textAlign: "center", padding: "20px 0" }}>All Products</h2>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default AllProduct;
