import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-20 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-green-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
            <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
              About CompanyPulse AI
            </span>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <h1 className="mb-6 text-5xl font-black text-white">
              About CompanyPulse AI
            </h1>

            <p className="text-lg leading-8 text-gray-300">
              CompanyPulse AI is an AI powered stock analysis platform built to
              help investors quickly understand companies, market trends, and
              financial performance using real-time data and artificial
              intelligence.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              This project fetches live market data from financial APIs,
              analyzes company fundamentals, and generates AI-based summaries to
              help users decide whether a stock may be a good investment or not.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <h2 className="mb-6 text-3xl font-bold text-white">
              How it works
            </h2>

            <ul className="space-y-4">
              <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                  ✓
                </div>
                <span className="text-gray-300">
                  Market data is fetched from Finnhub API
                </span>
              </li>

              <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                  ✓
                </div>
                <span className="text-gray-300">
                  Historical data is used to generate charts
                </span>
              </li>

              <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                  ✓
                </div>
                <span className="text-gray-300">
                  Financial metrics are analyzed
                </span>
              </li>

              <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                  ✓
                </div>
                <span className="text-gray-300">
                  AI generates a summary using LLM model
                </span>
              </li>

              <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                  ✓
                </div>
                <span className="text-gray-300">
                  Results are displayed in a clean dashboard
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <h2 className="mb-6 text-3xl font-bold text-white">
              About Developer
            </h2>

            <p className="text-lg leading-8 text-gray-300">
              This project was created by <b className="text-white">Tejas B</b>,
              a Computer Science engineering graduate interested in technology,
              finance, public policy, and artificial intelligence.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              CompanyPulse AI was built as a learning project to explore
              full-stack development using React, FastAPI, PostgreSQL, caching,
              APIs, and AI integration.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              The goal of this project is to create a professional level stock
              analysis platform similar to Bloomberg, TradingView, or Yahoo
              Finance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}