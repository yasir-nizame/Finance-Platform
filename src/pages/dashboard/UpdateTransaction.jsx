import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Spin,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import SPButton from "../../components/atoms/sp-button";

const { Option } = Select;

const fetchAllTransactions = async () => {
  const { data } = await axios.get("http://localhost:3001/transactions");
  return data;
};

const UpdateTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);
  const [form] = Form.useForm();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactions,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axios.put(`http://localhost:3001/transactions/${id}`, updatedData),
    onSuccess: () => {
      message.success("Transaction updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/dashboard/all-transactions");
    },
  });

  const handleSelect = (id) => {
    const selected = transactions.find((t) => t.id === id);
    if (selected) {
      form.setFieldsValue({
        ...selected,
        date: dayjs(selected.date),
      });
      setSelectedId(id);
    }
  };

  const handleSubmit = (values) => {
    if (!selectedId) return message.error("Please select a transaction first.");

    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };

    updateMutation.mutate({ id: selectedId, updatedData: formattedValues });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl border border-gray-100 px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Update a Transaction
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Form layout="vertical" className="mb-6">
              <Form.Item label="Select Transaction">
                <Select
                  placeholder="Choose a transaction to update"
                  onChange={handleSelect}
                  className="w-full"
                  showSearch
                  optionFilterProp="children"
                >
                  {transactions.map((t) => (
                    <Option key={t.id} value={t.id}>
                      {t.category} - Rs {t.amount} ({t.date})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Type is required" }]}
              >
                <Select placeholder="Select type">
                  <Option value="income">Income</Option>
                  <Option value="expense">Expense</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Amount is required" }]}
              >
                <Input type="number" placeholder="Enter amount" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Category is required" }]}
              >
                <Input placeholder="Enter category" />
              </Form.Item>

              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date is required" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea
                  rows={3}
                  placeholder="Enter note or description"
                />
              </Form.Item>

              <Form.Item>
                <SPButton
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-600 hover:bg-blue-700 w-1/4 p-3"
                  disabled={!selectedId}
                >
                  Update Transaction
                </SPButton>
              </Form.Item>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
};

export default UpdateTransaction;
