/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button, Col, Row, Spin, Upload, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../redux/features/products/productApi";

const IMAGE_BB_API_KEY = "96c1377a0c6d8cb17025be37afc1a870";
const { TextArea } = Input;

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    inStock: true,
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const categoryOptions = [
    "Writing",
    "Office Supplies",
    "Art Supplies",
    "Educational",
    "Technology",
  ];

  // Generalized handler for both input fields and textareas
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMAGE_BB_API_KEY}`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    try {
      const toastId = toast.loading("Creating Product...");
      const productData = { ...formData, image: imageUrl };

      const res = await createProduct(productData).unwrap();

      if (res.error) {
        toast.error(`${res.error.data.message}`);
      } else {
        toast.success("Product created successfully!", {
          id: toastId,
          duration: 2000,
        });

        // Clear form after successful submission
        setFormData({
          name: "",
          brand: "",
          price: "",
          category: "",
          description: "",
          quantity: "",
          inStock: true,
        });
        setImageUrl("");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div
        className="max-w-2xl bg-white shadow-lg rounded-lg"
        style={{ padding: "30px" }}
      >
        <h2 className="text-2xl text-center mb-4">Create Product</h2>

        {/* Image Upload Section */}
        <div className="text-center" style={{ marginBottom: "20px" }}>
          <Upload
            beforeUpload={(file) => {
              handleImageUpload(file);
              return false;
            }}
            showUploadList={false}
            disabled={isUploading || !!imageUrl}
          >
            <Button
              icon={<UploadOutlined />}
              disabled={isUploading || !!imageUrl}
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </Upload>

          {isUploading && (
            <div className="mt-2 w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
              <Spin size="small" />
            </div>
          )}

          {!isUploading && imageUrl && (
            <div
              className="flex flex-col items-center"
              style={{ marginTop: "20px" }}
            >
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-24 h-24 rounded"
              />
              <Button type="link" danger onClick={() => setImageUrl("")}>
                Remove Image
              </Button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <Row gutter={[20, 16]}>
          <Col xs={24} sm={12}>
            <label>Product Name</label>
            <Input
              style={{ margin: "10px 0" }}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Col>

          <Col xs={24} sm={12}>
            <label>Brand</label>
            <Input
              style={{ margin: "10px 0" }}
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </Col>

          <Col xs={24} sm={12}>
            <label>Price</label>
            <Input
              style={{ margin: "10px 0" }}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Col>

          <Col xs={24} sm={12}>
            <label>Category</label>
            <Select
              style={{ margin: "10px 0" }}
              className="w-full"
              value={formData.category}
              onChange={handleSelectChange}
              placeholder="Select Category"
            >
              {categoryOptions.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24}>
            <label>Product Description</label>
            <TextArea
              style={{ margin: "10px 0" }}
              name="description"
              value={formData.description}
              onChange={handleInputChange} // Use the generalized handler
              rows={4}
            />
          </Col>

          <Col xs={24} sm={12}>
            <label>Quantity</label>
            <Input
              style={{ margin: "10px 0" }}
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </Col>

          <Col xs={24} sm={12}>
            <label>Stock Status</label>
            <Select
              style={{ margin: "10px 0" }}
              className="w-full"
              value={formData.inStock}
              onChange={(value) => setFormData({ ...formData, inStock: value })}
            >
              <Select.Option value={true}>In Stock</Select.Option>
              <Select.Option value={false}>Out of Stock</Select.Option>
            </Select>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button
          className="text-white"
          style={{
            marginTop: "20px",
            backgroundColor: "green",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default CreateProduct;
