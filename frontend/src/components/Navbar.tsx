import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedName =
      localStorage.getItem("username") ||
      localStorage.getItem("email") ||
      "User";

    if (token) {
      setLoggedIn(true);
      setUsername(savedName.split("@")[0].toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    window.location.href = "/login";
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1220]/85 backdrop-blur-2xl"
    >
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-20 top-0 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative flex w-full items-center justify-between px-8 py-4">
        {/* Left */}
        <a href="/" className="group flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]">
            <div className="h-3.5 w-3.5 rounded-full bg-green-400 shadow-[0_0_18px_rgba(74,222,128,0.9)]" />
          </div>

          <div>
            <div className="text-2xl font-black tracking-tight text-white">
              CompanyPulse AI
            </div>

            <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">
              Market Intelligence
            </div>
          </div>
        </a>

        {/* Right */}
        <div className="flex items-center gap-3">
          <NavItem href="/" label="Home" />

          {!loggedIn ? (
            <NavItem href="/login" label="Login" />
          ) : (
            <div
              className="relative pb-2"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <button
                className="
                  group relative overflow-hidden rounded-2xl border border-white/10
                  bg-white/[0.04] px-6 py-3 text-sm font-semibold text-gray-300
                  backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5
                  hover:border-white/20 hover:bg-white hover:text-black
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
                "
              >
                {username}
              </button>

              {showMenu && (
                <div
                  className="
                  absolute right-0 top-full w-44 rounded-2xl border border-white/10
                  bg-[#0f172a]/95 p-2 shadow-2xl backdrop-blur-2xl
                "
                >
                  <a
                    href="/history"
                    className="
                      block rounded-xl px-4 py-3 text-sm font-medium text-gray-300
                      transition hover:bg-white/10 hover:text-white
                    "
                  >
                    History
                  </a>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full rounded-xl px-4 py-3 text-left text-sm font-medium
                      text-red-300 transition hover:bg-red-500/10 hover:text-red-200
                    "
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <NavItem href="/about" label="About" />
        </div>
      </div>
    </motion.nav>
  );
}

function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-gray-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
    >
      <span className="relative z-10">{label}</span>

      <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-3/4" />
    </a>
  );
}