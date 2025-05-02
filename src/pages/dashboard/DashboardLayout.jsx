import { Layout, Menu } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
// Header,
const { Sider, Content } = Layout;

const DashboardLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/dashboard/create-transaction",
      icon: <PlusCircleOutlined />,
      label: <Link to="/dashboard/create-transaction">Create Transaction</Link>,
    },
    {
      key: "/dashboard/edit-transaction",
      icon: <EditOutlined />,
      label: <Link to="/dashboard/edit-transaction">Edit Transaction</Link>,
    },
    {
      key: "/dashboard/delete-transaction",
      icon: <DeleteOutlined />,
      label: <Link to="/dashboard/delete-transaction">Delete Transaction</Link>,
    },
  ];

  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <>
      <Header />
      <Layout className="min-h-screen">
        <Sider className="bg-gray-900">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="bg-gray-900"
          />
        </Sider>

        <Layout>
          <Content className="min-h-screen bg-gray-50">
            {isDashboardRoot ? (
              <div className="flex justify-center items-center h-full">
                <img
                  src="/bg_dashboard.jpg"
                  alt="Dashboard Background"
                  className="rounded-xl shadow-lg "
                />
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Outlet />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </>
  );
};

export default DashboardLayout;
