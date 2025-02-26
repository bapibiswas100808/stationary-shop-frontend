import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/products/productApi";
import ProjectForm from "../../components/form/ProjectForm";
import ProjectInput from "../../components/form/ProjectInput";
import ProjectSelect from "../../components/form/ProjectSelect";
import { Button, Spin } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const ProductUpdate = () => {
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
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
  const { data: productData, isLoading } = useGetSingleProductQuery(productId);

  const defaultValues = {
    name: productData?.data.name,
    brand: productData?.data.brand,
    price: productData?.data.price,
    description: productData?.data.description,
    quantity: productData?.data.quantity,
    inStock: productData?.data.inStock,
    category: productData?.data.category,
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
    const toastId = toast.loading("Updating Product");
    try {
      const updateData = data;
      const response = await updateProduct({
        productId: productId,
        productInfo: updateData,
      }).unwrap();
      console.log(response);
      toast.success("product updated succesfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/admin/allProducts");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", {
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
    <div className="flex items-center justify-center min-h-[90vh]">
      <div
        className="min-w-full lg:min-w-[70%]"
        style={{
          margin: "0 auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2
          className="text-xl lg:text-2xl text-center"
          style={{ marginBottom: "30px" }}
        >
          Update Product
        </h2>
        <ProjectForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(productSchema)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          </div>
          <Button
            style={{ backgroundColor: "green", color: "white" }}
            htmlType="submit"
            className="mt-4"
          >
            Update Product
          </Button>
        </ProjectForm>
      </div>
    </div>
  );
};

export default ProductUpdate;
