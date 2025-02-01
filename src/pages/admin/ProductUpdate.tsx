import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/productApi";
import ProjectForm from "../../components/form/ProjectForm";
import ProjectInput from "../../components/form/ProjectInput";
import ProjectSelect from "../../components/form/ProjectSelect";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ProductUpdate = () => {
  const options = [
    { value: true, label: "In Stock" },
    { value: false, label: "Stock out" },
  ];
  const categoryOptions = [
    { value: "Writing", label: "Writing" },
    { value: "Office Supplies", label: "Office Supplies" },
    { value: "Art Supplies", label: "Art Supplies" },
    { value: "Educational", label: "Educational" },
    { value: "Technology", label: "Technology" },
  ];
  const { productId } = useParams();
  const { data } = useGetSingleProductQuery(productId);

  const defaultValues = {
    name: data?.name,
    brand: data?.brand,
    price: data?.price,
    description: data?.description,
    quantity: data?.quantity,
  };
  const productSchema = z.object({
    name: z
      .string({ required_error: "Name field is required" })
      .min(1, "Name is required"),
    brand: z
      .string({ required_error: "Brand field is required" })
      .min(1, "Brand is required"),
    price: z
      .number({ required_error: "Price field is required" })
      .min(1, "Price must be greater than 0"),
    category: z.string({ required_error: "Please select a category" }),
    description: z.string({ required_error: "Description field is required" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .min(1, "Quantity must be at least 1"),
    inStock: z
      .boolean({ required_error: "Stock field is required" })
      .default(true),
    isDeleted: z.boolean().default(false),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2>Update Product</h2>
      <ProjectForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(productSchema)}
      >
        <ProjectInput type="text" name="name" label="Name" />
        <ProjectInput type="text" name="brand" label="Brand" />
        <ProjectInput type="number" name="price" label="Price" />
        <ProjectInput type="number" name="quantity" label="Quantity" />
        <ProjectInput type="text" name="description" label="Description" />
        <ProjectSelect options={options} name="inStock" label="Stock" />
        <ProjectSelect
          options={categoryOptions}
          name="category"
          label="Category"
        />
        <Button htmlType="submit">Update Product</Button>
      </ProjectForm>
    </div>
  );
};

export default ProductUpdate;
