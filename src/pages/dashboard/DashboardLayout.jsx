import { Layout, Menu } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <PlusCircleOutlined />,
      label: <Link to="/create-transaction">Create Transaction</Link>,
    },
    {
      key: "/edit",
      icon: <EditOutlined />,
      label: <Link to="/edit-transaction">Edit Transaction</Link>,
    },
    {
      key: "/delete",
      icon: <DeleteOutlined />,
      label: <Link to="/delete-transaction">Delete Transaction</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider className="bg-gray-900">
        <div className="text-white text-xl font-bold py-4 text-center border-b border-gray-700">
          💰 FinanceDash
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="bg-gray-900"
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow-md px-6">
          <h1 className="text-2xl font-semibold">
            Finance Transaction Manager
          </h1>
        </Header>
        <Content className="p-6 bg-gray-50">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
