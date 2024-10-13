import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import "../../styles/output.css";
import { Button } from "@nextui-org/react";

const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useTokenExpiration();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
      return;
    }
    actions.getMe();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
