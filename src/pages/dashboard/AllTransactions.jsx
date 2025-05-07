import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Spin, Alert, Tag, Button, Modal } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import { useAuth } from "../../services/authContext";
import AddTransaction from "./AddTransaction";
import UpdateTransaction from "./UpdateTransaction";
import DeleteTransaction from "./DeleteTransaction";

const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:3001/transactions");
  return data;
};

const AllTransactions = () => {
  const [auth] = useAuth();
  const { id } = useParams();
  const username =
    auth?.user?.username || auth?.user?.user_metadata?.full_name || "User";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    enabled: !id,
  });

  const [modalVisible, setModalVisible] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const openModal = (type) => {
    setModalVisible({ ...modalVisible, [type]: true });
  };

  const closeModal = (type) => {
    setModalVisible({ ...modalVisible, [type]: false });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="font-bold text-2xl mb-4 text-center">
        <h1>Welcome! {username}</h1>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        All Transactions
      </h1>
      <div className="flex items-end justify-end gap-3 m-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal("add")}
        >
          Add
        </Button>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => openModal("edit")}
        >
          Edit
        </Button>
        <Button
          type="default"
          danger
          icon={<DeleteOutlined />}
          onClick={() => openModal("delete")}
        >
          Delete
        </Button>
      </div>
      {/* {isLoading && <Spin tip="Loading transactions..." size="large" />} */}
      {isError && (
        <Alert
          message="Error"
          description="Failed to load transactions"
          type="error"
          showIcon
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data &&
          data.map((item) => (
            <Card
              key={item.id}
              title={
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{item.category}</span>
                  <Tag
                    color={item.type === "income" ? "green" : "red"}
                    className="text-sm"
                  >
                    {item.type === "income" ? (
                      <span>
                        <ArrowDownOutlined /> Income
                      </span>
                    ) : (
                      <span>
                        <ArrowUpOutlined /> Expense
                      </span>
                    )}
                  </Tag>
                </div>
              }
              className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <p className="text-base mb-1">
                <span className="font-medium text-gray-600">Amount:</span>{" "}
                <span className="text-black font-semibold">
                  Rs {item.amount}
                </span>
              </p>
              <p className="text-base mb-1">
                <span className="font-medium text-gray-600">Date:</span>{" "}
                {item.date}
              </p>
              {item.description && (
                <p className="text-base text-gray-600">
                  <span className="font-medium">Note:</span> {item.description}
                </p>
              )}
            </Card>
          ))}
      </div>

      {/* Add Transaction Modal */}
      <Modal
        open={modalVisible.add}
        onCancel={() => closeModal("add")}
        footer={null}
        width={600}
      >
        <AddTransaction onClose={() => closeModal("add")} />
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal

        open={modalVisible.edit}
        onCancel={() => closeModal("edit")}
        footer={null}
        width={600}
      >
        <UpdateTransaction onClose={() => closeModal("edit")} />
      </Modal>

      {/* Delete Transaction Modal */}
      <Modal
        open={modalVisible.delete}
        onCancel={() => closeModal("delete")}
        footer={null}
        width={600}
      >
        <DeleteTransaction onClose={() => closeModal("delete")} />
      </Modal>
    </div>
  );
};

export default AllTransactions;

