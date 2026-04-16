import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import MarketBar from "../components/MarketBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-black">
      <MarketBar />
      <Navbar />

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}