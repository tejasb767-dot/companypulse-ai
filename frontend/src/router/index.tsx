import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import CompanyReport from "../pages/CompanyReport";
import About from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },

      { path: "about", element: <About /> },   // ✅ FIX

      { path: "company/:symbol", element: <CompanyReport /> },
    ],
  },
]);