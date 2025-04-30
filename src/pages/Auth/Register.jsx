import React from "react";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router";
import { useState } from "react";
import { signUp } from "../../helpers/authHelper";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { email, password } = values;
    let { data, error } = await signUp({ email, password });
    if (data) {
      setMessage("User registered successfully");
      navigate("/login");
    }
    if (error) {
      setMessage("Error in registering user");
      console.log(error);
      return;
    }
  };
  return (
    <>
      {message && <p className="text-red-500 mt-4">{message}</p>}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <Form layout="horizontal" style={{ maxWidth: 600 }} onFinish={onFinish}>
          {/* <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input />
          </Form.Item> */}
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
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Form.Item label="Gender" name="gender">
            <Radio.Group
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Radio value="Male"> Male </Radio>
              <Radio value="female"> Female </Radio>
              <Radio value="others"> others </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="DOB"
            rules={[{ required: true, message: "Please enter your DOB" }]}
            name="dob"
          >
            <DatePicker />
          </Form.Item> */}
          <Form.Item label="">
            <Button htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Register;
