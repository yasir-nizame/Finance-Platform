import React from "react";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:3001/transactions");
  return data;
};

const TransactionList = () => {
  const { data, isLoading } = useQuery(["transactions"], fetchTransactions);

  const columns = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  return (
    <div className="p-4">
      <Table
        dataSource={data}
        columns={columns}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};

export default TransactionList;
