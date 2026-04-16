import SearchBox from "../components/SearchBox";
import LatestNews from "../components/LatestNews";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot/Chatbot";

export default function Home() {
  const navigate = useNavigate();

  const companies = [
    { name: "Apple", symbol: "AAPL" },
    { name: "Microsoft", symbol: "MSFT" },
    { name: "Amazon", symbol: "AMZN" },
    { name: "Meta", symbol: "META" },
    { name: "Tesla", symbol: "TSLA" },
    { name: "Google", symbol: "GOOGL" },
    { name: "Nvidia", symbol: "NVDA" },
    { name: "Reliance", symbol: "RELIANCE.NS" },
    { name: "TCS", symbol: "TCS.NS" },
    { name: "Infosys", symbol: "INFY.NS" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Full black background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000000,#050505,#0a0a0a)]" />

      {/* Soft white glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-white/[0.03] blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-white/[0.04] blur-[140px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-0 pt-0 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full min-h-[calc(100vh-6rem)] border-y border-white/10 bg-black/70 px-10 py-16 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-5xl font-black tracking-tight text-white md:text-7xl"
          >
            CompanyPulse AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-center text-lg text-gray-400 md:text-2xl"
          >
            Real-Time AI Powered Stock Intelligence & Market Insights
          </motion.p>

          <div className="mt-10 flex justify-center">
            <SearchBox />
          </div>

          <div className="mt-20 text-center">
            <p className="mb-6 text-lg text-gray-500">
              Analyze Trending Companies
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {companies.map((c) => (
                <motion.div
                  key={c.symbol}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/company/${c.symbol}`)}
                  className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-gray-200 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  {c.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 mt-0 w-full">
          <LatestNews />
        </div>
      </div>

      <Chatbot />
    </div>
  );
}