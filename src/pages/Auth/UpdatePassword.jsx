import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { updatePassword } from "../../helpers/authHelper.js";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ password }) => {
    setLoading(true);
    const { error } = await updatePassword({ password });

    if (error) {
      message.error("Failed to update password.");
    } else {
      message.success("Password updated. Please log in again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Set New Password</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
