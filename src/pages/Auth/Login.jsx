import React, { useState, useEffect } from "react";
import { Button, Form, Input, Card, Typography } from "antd";
import { login, loginWithGoogle } from "../../helpers/authHelper";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authContext";
import Layout from "../../components/Layout";
import { GoogleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (!auth.loading && auth.user) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  const onFinish = async (values) => {
    const { email, password } = values;
    const { error, data } = await login({ email, password });

    if (data?.session) {
      setMessage("User logged in successfully");
      navigate("/", { replace: true });
    }

    if (error) {
      setMessage("Error logging in user");
      console.log(error);
    }
  };

  const handleGoogleSSO = async () => {
    const { data, error } = await loginWithGoogle();
    if (error) {
      setMessage("Google SSO failed: " + error.message);
      console.log(error);
    }
  };

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Login - App">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-xl rounded-xl">
          <div className="text-center mb-6">
            <Title level={2}>Welcome Back</Title>
            <Text type="secondary">Please login to your account</Text>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {message && (
              <Text type="danger" className="block mt-2">
                {message}
              </Text>
            )}

            <Form.Item className="mt-4">
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>
            <Button
              icon={<GoogleOutlined />}
              className="w-full flex items-center justify-center border border-gray-300"
              onClick={handleGoogleSSO}
            >
              Continue with Google
            </Button>
          </Form>

          <div className="flex justify-between mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              New User? Register
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
