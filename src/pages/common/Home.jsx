import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Spin, Alert, Tag } from "antd";
import Layout from "../../components/Layout";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useParams } from "react-router";

const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:3001/transactions");
  return data;
};

const Home = () => {
  const {id} =useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    enabled: !id,
  });

  return (
    <Layout title="Finance App - Home">
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          All Transactions
        </h1>

        {isLoading && <Spin tip="Loading transactions..." size="large" />}

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
                    <span className="font-semibold text-lg">
                      {item.category}
                    </span>
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
                    <span className="font-medium">Note:</span>{" "}
                    {item.description}
                  </p>
                )}
              </Card>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
