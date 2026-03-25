export default function About() {
  return (

    <div className="max-w-4xl mx-auto mt-10 space-y-6">

      <h1 className="text-4xl font-bold">
        About CompanyPulse AI
      </h1>

      <p>
        CompanyPulse AI is an AI powered stock analysis platform
        built to help investors quickly understand companies,
        market trends, and financial performance using real-time data
        and artificial intelligence.
      </p>

      <p>
        This project fetches live market data from financial APIs,
        analyzes company fundamentals, and generates AI-based
        summaries to help users decide whether a stock may be
        a good investment or not.
      </p>

      <h2 className="text-2xl font-semibold mt-6">
        How it works
      </h2>

      <ul className="list-disc ml-6 space-y-2">

        <li>
          Market data is fetched from Finnhub API
        </li>

        <li>
          Historical data is used to generate charts
        </li>

        <li>
          Financial metrics are analyzed
        </li>

        <li>
          AI generates a summary using LLM model
        </li>

        <li>
          Results are displayed in a clean dashboard
        </li>

      </ul>

      <h2 className="text-2xl font-semibold mt-6">
        About Developer
      </h2>

      <p>
        This project was created by <b>Tejas B</b>, a Computer Science
        engineering graduate interested in technology, finance,
        public policy, and artificial intelligence.
      </p>

      <p>
        CompanyPulse AI was built as a learning project to explore
        full-stack development using React, FastAPI, PostgreSQL,
        caching, APIs, and AI integration.
      </p>

      <p>
        The goal of this project is to create a professional level
        stock analysis platform similar to Bloomberg, TradingView,
        or Yahoo Finance.
      </p>

    </div>

  );
}