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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 blur-3xl opacity-30" />

      <div className="relative flex flex-col items-center justify-center mt-20 px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-gray-800 text-center"
        >
          CompanyPulse AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-lg md:text-xl text-gray-700 text-center"
        >
          AI Powered Stock Analysis Platform
        </motion.p>

        <div className="mt-10 w-full flex justify-center">
          <SearchBox />
        </div>

        <div className="mt-24 text-center w-full max-w-4xl">
          <p className="text-gray-600 mb-5 text-lg">Or analyze</p>

          <div className="flex flex-wrap justify-center gap-3">
            {companies.map((c) => (
              <motion.div
                key={c.symbol}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/company/${c.symbol}`)}
                className="px-5 py-3 rounded-2xl border border-gray-200 bg-white/90 text-gray-700 cursor-pointer shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                {c.name}
              </motion.div>
            ))}
          </div>
        </div>

        <LatestNews />
      </div>
      <Chatbot />
    </div>
  );
}
