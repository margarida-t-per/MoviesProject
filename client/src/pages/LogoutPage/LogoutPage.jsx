import React, { useEffect } from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  }, [logout]);

  return (
    <div>
      <h3>Logging Out...</h3>
    </div>
  );
};

export default LogoutPage;
