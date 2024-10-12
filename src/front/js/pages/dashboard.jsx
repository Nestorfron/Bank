import React from "react";
import { useTheme } from "next-themes";
import "../../styles/output.css";
import { Button } from "@nextui-org/react";

const Dashboard = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      The current theme is: {theme}
      <Button onClick={() => setTheme("light")}>Light Mode</Button>
      <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
    </div>
  );
};

export default Dashboard;
