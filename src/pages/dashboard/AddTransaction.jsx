// components/AddTransaction.jsx
import React from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const { Option } = Select;

const AddTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTransaction) =>
      axios.post("http://localhost:3001/transactions", newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const onFinish = (values) => {
    mutation.mutate({
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    });
  };

  return (
    <Form onFinish={onFinish} layout="vertical" className="p-4">
      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </Form.Item>
      <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Transaction
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTransaction;
