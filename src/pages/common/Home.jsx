import Layout from "../../components/Layout";
import { useAuth } from "../../services/authContext";

const Home = () => {
  const [auth] = useAuth();
  console.log(auth);
  return (
    <Layout title="Finance App - Home">
      <div>Welcome to home </div>
    </Layout>
  );
};
export default Home;
