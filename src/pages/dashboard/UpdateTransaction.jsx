import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Form, Input, Button, message } from "antd";

const fetchTransaction = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/transactions/${id}`);
  return data;
};

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransaction(id),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedTransaction) =>
      axios.put(`http://localhost:3001/transactions/${id}`, updatedTransaction),
    onSuccess: () => {
      message.success("Transaction updated!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/");
    },
  });

  const handleSubmit = (values) => {
    updateMutation.mutate(values);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1>Edit Transaction</h1>
      <Form
        initialValues={data}
        onFinish={handleSubmit}
        layout="vertical"
        className="max-w-md mx-auto"
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update Transaction
        </Button>
      </Form>
    </div>
  );
};

export default UpdateTransaction;
