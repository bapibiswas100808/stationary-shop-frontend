/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "../../redux/features/user/user.api";
import { Button, Table, Spin } from "antd";
// import { toast } from "sonner";

const UserManagement = () => {
  const {
    data: allUserData,
    isLoading,
    refetch,
  } = useGetAllUserQuery(undefined);
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (userEmail: string) => {
    try {
      await updateUserStatus(userEmail);
      toast.success(`User status updated`);
      refetch();
    } catch (error) {
      toast.error("Error updating user status");
    }
  };
  console.log(allUserData);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status === "active" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          onClick={() => handleStatusChange(record?.email)}
          type="primary"
          danger={record.status === "active"}
        >
          {record.status === "active" ? "Block" : "Activate"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <Table
        style={{ overflow: "scroll" }}
        columns={columns}
        dataSource={allUserData?.data}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default UserManagement;
