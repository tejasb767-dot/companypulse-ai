import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import CompanyReport from "../pages/CompanyReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/company/:symbol",
    element: (
      <MainLayout>
        <CompanyReport />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
]);