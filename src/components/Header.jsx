import React from "react";
import { Button } from "antd";
import { useAuth } from "../services/authContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
    setAuth({
      user: null,
      token: "",
    });
  };
  return (
    <>
      <div className="flex flex-row">
        <div className="bg-blue-300 w-screen p-3">Header</div>
        <div className="items-center">
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
    </>
  );
};
export default Header;
