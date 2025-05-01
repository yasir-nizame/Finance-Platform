import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, message } from "antd";

const deleteTransaction = async (id) => {
  await axios.delete(`http://localhost:3001/transactions/${id}`);
};

const DeleteTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTransaction(id),
    onSuccess: () => {
      message.success("Transaction deleted!");
      queryClient.invalidateQueries(["transactions"]);
      navigate("/");
    },
  });

  return (
    <div className="p-4">
      <h1>Are you sure you want to delete this transaction?</h1>
      <Button type="danger" onClick={() => deleteMutation.mutate()}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteTransaction;
