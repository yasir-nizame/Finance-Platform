import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import SPButton from "../../components/atoms/sp-button";
// import { resetPassword } from "../../helpers/authHelper.js";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email }) => {
    console.log("Sending reset link to:", email);
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://localhost:5173/update-password",
    });

    console.log("RESET RESPONSE:", {
      data,
      error: error?.message,
      stack: error?.stack,
    });
    if (error) {
      message.error("Failed to send reset email.");
    } else {
      message.success("Check your email for the reset link.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <SPButton
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Send Reset Link
            </SPButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
