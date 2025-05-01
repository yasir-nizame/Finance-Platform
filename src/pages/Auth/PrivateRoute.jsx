import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../services/authContext";

const ProtectedRoute = () => {
  const [auth] = useAuth();

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
