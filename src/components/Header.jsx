import React from "react";
import { Button } from "antd";
import { useAuth } from "../services/authContext";
import supabase from "../services/supabase";
import { Link } from "react-router";
import SPButton from "./atoms/sp-button";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const isDashboardRoot = location.pathname === "/dashboard";

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        return;
      }

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (auth.loading) return null;
  return (
    <div className="flex flex-row justify-between items-center bg-gray-900 overflow-x-hidden p-3">
      <div className="text-white text-xl font-bold text-center border-b border-gray-700">
        💰 FinanceDash
      </div>
      {auth?.user && (
        <div>
          <SPButton onClick={handleLogout} type="primary">
            Logout
          </SPButton>

          {!isDashboardRoot && (
            <SPButton type="default" className=" ml-2">
              <Link to="/dashboard">Dashboard</Link>
            </SPButton>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
