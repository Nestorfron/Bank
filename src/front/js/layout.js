import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Home } from "../js/pages/home.jsx";
import injectContext from "../js/store/appContext.js";

import { NavBar } from "./component/navbar";
import Dashboard from "../js/pages/dashboard.jsx";
import { Users } from "../js/pages/users.jsx";
import { Branches } from "../js/pages/branches.jsx";
import { Assets } from "../js/pages/assets.jsx";
import { UsersMB } from "../js/pages/usersMB.jsx";

//create your first component
const Layout = ({ Component, pageProps }) => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <BrowserRouter basename={basename} {...pageProps}>
          <ScrollToTop>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/usersMB" element={<UsersMB />} />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default injectContext(Layout);
