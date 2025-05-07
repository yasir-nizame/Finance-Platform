import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/common/Home";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ProtectedRoute from "./pages/Auth/PrivateRoute";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import TransactionList from "./pages/dashboard/AllTransactions";
import DeleteTransaction from "./pages/dashboard/DeleteTransaction";
import UpdateTransaction from "./pages/dashboard/UpdateTransaction";
import AddTransaction from "./pages/dashboard/AddTransaction";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="create-transaction" element={<AddTransaction />} />
              <Route path="edit-transaction" element={<UpdateTransaction />} />
              <Route path="all-transactions" element={<TransactionList />} />
              <Route
                path="delete-transaction"
                element={<DeleteTransaction />}
              />
            </Route>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
