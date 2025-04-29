import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Radio } from "antd";
const Register = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item label="Gender" className="flex flex-row">
            <Radio.Group>
              <Radio value="Male"> Male </Radio>
              <Radio value="female"> Female </Radio>
              <Radio value="others"> others </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="DOB">
            <DatePicker />
          </Form.Item>
          <Form.Item label="">
            <Button>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Register;
