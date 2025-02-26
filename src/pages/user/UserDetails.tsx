/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input, Spin } from "antd";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { toast } from "sonner";

type TAdress = {
  id: string;
  updates: {
    address: string;
    city: string;
    phone: string;
  };
};

const UserDetails = () => {
  const user = useAppSelector(useCurrentUser);
  const email = user?.email;
  const { data: userDetails, isLoading } = useGetSingleUserQuery(email);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
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
  const handleUpdate = async (values: TAdress) => {
    const toastId = toast.loading("Updating Youe Profile");
    const userId = userDetails?.data?._id;

    if (!userId) {
      console.error("🚨 Error: User ID is missing!");
      return;
    }

    try {
      await updateUser({
        id: userId,
        updates: values,
      }).unwrap();

      toast.success("Profile Updated Successfully", {
        id: toastId,
        duration: 2000,
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 className="text-2xl font-bold text-green-700 ">Profile</h2>

      <div
        className="flex flex-col lg:flex-row items-center justify-between"
        style={{ marginTop: "40px" }}
      >
        <p>
          <strong className="text-green-700">Name:</strong>{" "}
          {userDetails?.data.name}
        </p>
        <p>
          <strong className="text-green-700">Email:</strong>{" "}
          {userDetails?.data.email}
        </p>
      </div>
      <Form
        style={{
          backgroundColor: "white",
          padding: "40px 20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
        form={form}
        initialValues={userDetails?.data}
        onFinish={handleUpdate}
        layout="vertical"
      >
        <Form.Item label="Shipping Address" name="address">
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input type="number" disabled={!isEditing} />
        </Form.Item>

        {isEditing ? (
          <>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <Button type="default" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Form>
    </div>
  );
};

export default UserDetails;
