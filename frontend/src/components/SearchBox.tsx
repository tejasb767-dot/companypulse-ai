import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { searchCompany } from "../api/search";

export default function SearchBox() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const searchTimeout = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function onChange(e: any) {
    const value = e.target.value;
    setText(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await searchCompany(value);

        if (Array.isArray(res)) {
          setResults(res.slice(0, 12));
        } else {
          setResults([]);
        }
      } catch (err) {
        console.log(err);
        setResults([]);
      }
    }, 50);
  }

  function onKey(e: any) {
    if (e.key === "Enter") {
      if (!text) return;

      navigate(`/company/${text.toUpperCase()}`);
      setResults([]);
    }
  }

  function selectCompany(symbol: string) {
    navigate(`/company/${symbol}`);

    setResults([]);
    setText(symbol);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-2xl mx-auto group"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 blur-xl opacity-40 transition duration-500 group-hover:opacity-70" />

      <div className="relative">
        <input
          value={text}
          onChange={onChange}
          onKeyDown={onKey}
          placeholder="Search Apple, Tesla, Reliance..."
          className="w-full rounded-3xl border border-white/10 bg-black/80 px-7 py-5 pr-16 text-lg text-white placeholder:text-gray-500 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300 focus:border-cyan-400/40 focus:outline-none"
        />

        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-white/70">
          🔍
        </div>
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 mt-3 w-full max-h-[320px] overflow-y-auto overflow-x-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
        >
          {results.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              onClick={() => selectCompany(r.symbol)}
              className="cursor-pointer border-b border-gray-100 px-6 py-4 transition-all duration-150 hover:bg-gray-50 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {r.symbol}
                  </div>

                  <div className="mt-1 line-clamp-1 text-sm text-gray-500">
                    {r.description}
                  </div>
                </div>

                <div className="text-xl text-green-500">↗</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}