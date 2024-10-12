//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/output.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.querySelector("#app")
);
