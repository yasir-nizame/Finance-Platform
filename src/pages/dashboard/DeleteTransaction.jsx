import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Card, Checkbox, message, Spin } from "antd";
import SPButton from "../../components/atoms/sp-button";

const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:3001/transactions");
  return data;
};

const deleteTransaction = async (id) => {
  await axios.delete(`http://localhost:3001/transactions/${id}`);
};

const DeleteTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await Promise.all(selectedIds.map(deleteTransaction));
    },
    onSuccess: () => {
      message.success("Selected transactions deleted!");
      queryClient.invalidateQueries(["transactions"]);
      navigate("/dashboard/all-transactions");
    },
  });

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Delete Transactions
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((txn) => (
              <Card
                key={txn.id}
                className={`border rounded-xl shadow-sm transition-all duration-200 ${
                  selectedIds.includes(txn.id)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {txn.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Rs {txn.amount} | {txn.type.toUpperCase()} | {txn.date}
                    </p>
                    {txn.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {txn.description}
                      </p>
                    )}
                  </div>
                  <Checkbox
                    checked={selectedIds.includes(txn.id)}
                    onChange={() => toggleSelection(txn.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedIds.length > 0 && (
          <div className="mt-10">
            <Card className="max-w-xl mx-auto bg-white border-red-100 shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-bold text-red-600 mb-4 text-center">
                Selected Transactions ({selectedIds.length})
              </h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                {data
                  .filter((txn) => selectedIds.includes(txn.id))
                  .map((txn) => (
                    <li key={txn.id}>
                      {txn.category} - Rs {txn.amount} ({txn.date})
                    </li>
                  ))}
              </ul>
              <SPButton
                danger
                type="primary"
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => deleteMutation.mutate()}
              >
                Delete
              </SPButton>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteTransaction;
