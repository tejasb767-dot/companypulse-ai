import { Outlet, Link, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import MarketBar from "../components/MarketBar";

export default function MainLayout() {
  const location = useLocation();

  const showBackButton = location.pathname !== "/";

  return (
    <div className="min-h-screen w-full bg-black">
      <MarketBar />
      <Navbar />

      {showBackButton && (
        <div className="w-full px-8 pt-4">
          <Link
            to="/"
            className="
              ml-8 inline-flex items-center gap-3 rounded-2xl
              border border-cyan-500/20 bg-white/[0.03]
              px-4 py-3 text-sm font-medium text-gray-300
              backdrop-blur-xl transition-all duration-300
              hover:border-cyan-400/50 hover:bg-cyan-500/10
              hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
            "
          >
            <span
              className="
                flex h-8 w-8 items-center justify-center rounded-xl
                bg-cyan-500/10 text-cyan-300 transition-all duration-300
                hover:-translate-x-1
              "
            >
              ←
            </span>

            <div className="flex flex-col leading-none">
              <span className="mt-1 text-sm font-semibold">
                Back to Home
              </span>
            </div>
          </Link>
        </div>
      )}

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}