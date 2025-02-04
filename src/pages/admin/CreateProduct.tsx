import { FieldValues, SubmitHandler } from "react-hook-form";
import ProjectForm from "../../components/form/ProjectForm";
import ProjectInput from "../../components/form/ProjectInput";
import { Button } from "antd";
import ProjectSelect from "../../components/form/ProjectSelect";
import { useCreateProductMutation } from "../../redux/features/products/productApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
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
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const toastId = toast.loading("Creating Product");
      const res = await createProduct(data).unwrap();
      if (res.error) {
        toast.error(`${res.error.data.message}`);
      } else {
        toast.success("product created succesfully", {
          id: toastId,
          duration: 2000,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("someting went wrong");
    }
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
    inStock: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
  });
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "20px 0" }}>Create Product</h2>
      <ProjectForm onSubmit={onSubmit} resolver={zodResolver(productSchema)}>
        <ProjectInput type="text" name="name" label="Product Name" />
        <ProjectInput type="text" name="brand" label="Brand" />
        <ProjectInput type="number" name="price" label="Price" />
        <ProjectSelect
          label="Category"
          name="category"
          options={categoryOptions}
        />
        <ProjectInput
          type="text"
          name="description"
          label="Product Description"
        />
        <ProjectInput type="number" name="quantity" label="Quantity" />
        <ProjectSelect label="Stock Status" name="inStock" options={options} />
        <Button htmlType="submit">Create Product</Button>
      </ProjectForm>
    </div>
  );
};

export default CreateProduct;
