import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import MarketBar from "../components/MarketBar";

export default function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <MarketBar />
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <Outlet />
      </div>

    </div>
  );
}