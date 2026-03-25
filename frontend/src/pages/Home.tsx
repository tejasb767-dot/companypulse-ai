import SearchBox from "../components/SearchBox";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

    <div className="relative flex flex-col items-center justify-center mt-20">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 blur-3xl opacity-40" />

      {/* title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-gray-800 z-10"
      >
        CompanyPulse AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 text-lg text-gray-700 z-10"
      >
        AI Powered Stock Analysis Platform
      </motion.p>

      {/* search */}
      <div className="mt-10 z-10 w-full flex justify-center">
        <SearchBox />
      </div>


      {/* OR ANALYZE */}
      <div className="mt-24 z-0 text-center">

        <p className="text-gray-600 mb-3">
          Or analyze
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl">

          {companies.map((c) => (

            <div
              key={c.symbol}
              onClick={() => navigate(`/company/${c.symbol}`)}
              className="px-4 py-2 rounded border
              bg-white text-gray-700
              cursor-pointer
              hover:bg-blue-600
              hover:text-white
              transition"
            >
              {c.name}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}