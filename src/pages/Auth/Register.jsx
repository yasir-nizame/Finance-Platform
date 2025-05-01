import React, { useState } from "react";
import { Button, Form, Input, Divider, message as antdMessage } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../../helpers/authHelper";
import supabase from "../../services/supabase";
import Layout from "../../components/Layout";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmailRegister = async (values) => {
    const { email, password } = values;
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      antdMessage.error(error.message);
    } else {
      antdMessage.success("User registered successfully. Check your email.");
      navigate("/login");
    }
    setLoading(false);
  };

  const handleGoogleSSO = async () => {
    const { data, error } = await loginWithGoogle();
    console.log("data", data);
    if (error) {
      antdMessage.error("Google SSO failed: " + error.message);
    }
  };

  return (
    <Layout title="Register - App">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h1>

          <Form layout="vertical" onFinish={handleEmailRegister}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full  flex items-center justify-center"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>Or</Divider>

          <Button
            icon={<GoogleOutlined />}
            className="w-full flex items-center justify-center border border-gray-300 mb-3"
            onClick={handleGoogleSSO}
          >
            Continue with Google
          </Button>
          <Link to="/login" className="text-blue-600 hover:underline mt-3 justify-center flex">
            {" "}
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
