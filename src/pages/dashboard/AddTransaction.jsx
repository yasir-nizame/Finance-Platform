import React from "react";
import { Form, Input, Button, Select, DatePicker, Card } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTransaction) =>
      axios.post("http://localhost:3001/transactions", newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/");
    },
  });

  const onFinish = (values) => {
    mutation.mutate({
      ...values,
      date: values.date.format("DD-MM-YYYY"),
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <Card
        title={
          <h2 className="text-xl font-bold text-gray-700">
            Add New Transaction
          </h2>
        }
        className="rounded-2xl shadow-lg border border-gray-100"
      >
        <Form onFinish={onFinish} layout="vertical" className="space-y-4 mt-4">
          <Form.Item
            name="type"
            label="Transaction Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount (Rs)"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter amount" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g. Salary, Groceries" />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Optional description..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700 w-1/4 h-10 text-base font-medium"
            >
              Add Transaction
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddTransaction;
