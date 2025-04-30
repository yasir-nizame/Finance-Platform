// Login.jsx
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { login } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authContext";

const Login = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const onFinish = async (values) => {
    const { email, password } = values;
    const { error, data } = await login({ email, password });

    if (data?.session) {
      setMessage("User logged in successfully");
      sessionStorage.setItem("access_token", data.session.access_token);
      sessionStorage.setItem("refresh_token", data.session.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      setAuth({
        user: data.user,
        token: data.session.access_token,
      });

      navigate("/");
    }

    if (error) {
      setMessage("Error logging in user");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </Form>
    </div>
  );
};

export default Login;
