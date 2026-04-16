import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NewsItem {
  headline: string;
  summary: string;
  image: string;
  source: string;
  url: string;
  datetime: number;
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

        if (!apiKey) {
          setError(
            "Finnhub API key not found. Add VITE_FINNHUB_API_KEY in frontend/.env"
          );
          return;
        }

        const response = await fetch(
          `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          setError(
            data?.error ||
              `Unable to fetch news. Status code: ${response.status}`
          );
          return;
        }

        if (!Array.isArray(data)) {
          setError("Finnhub did not return news articles.");
          return;
        }

        // keep only articles that have title and url
        const validNews = data
          .filter(
            (item: any) =>
              item.headline &&
              item.url &&
              item.headline.trim() !== "" &&
              item.url.trim() !== ""
          )
          .slice(0, 12);

        setNews(validNews);
      } catch (err) {
        console.error(err);
        setError("Failed to load live financial news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="relative z-10 mt-0 mb-0 w-full border-t border-white/10 bg-black px-10 py-12">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/[0.04] blur-[140px]" />
      </div>

      {/* heading */}
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            <span className="text-xs font-semibold tracking-[0.25em] text-white/60">
              LIVE NEWS FEED
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Latest Market News
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
            Real-time financial headlines, market movements and company updates.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-2xl">
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-white/70">
            Finnhub Feed Active
          </span>
        </div>
      </div>

      {/* loading state */}
      {loading && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] animate-pulse"
            >
              <div className="h-60 bg-white/5" />
              <div className="p-6">
                <div className="mb-4 h-4 w-28 rounded bg-white/10" />
                <div className="mb-3 h-6 w-4/5 rounded bg-white/10" />
                <div className="mb-2 h-4 rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* error state */}
      {!loading && error && (
        <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center backdrop-blur-2xl">
          <h3 className="mb-3 text-2xl font-bold text-red-400">
            Could Not Load News
          </h3>

          <p className="text-gray-300">{error}</p>

          <pre className="mt-5 inline-block rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-left text-sm text-green-400">
{`VITE_FINNHUB_API_KEY=your_actual_finnhub_key`}
          </pre>
        </div>
      )}

      {/* no news fallback */}
      {!loading && !error && news.length === 0 && (
        <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-10 text-center">
          <h3 className="mb-3 text-2xl font-bold text-white">
            No News Available
          </h3>

          <p className="text-gray-500">
            Finnhub returned no news. Check your API key or API rate limit.
          </p>
        </div>
      )}

      {/* cards */}
      {!loading && !error && news.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_30px_80px_rgba(255,255,255,0.06)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    item.image &&
                    item.image.trim() !== "" &&
                    item.image !== "https://static2.finnhub.io/file/publicdatany/finnhubimage/market_news.jpg"
                      ? item.image
                      : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={item.headline}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop";
                  }}
                  className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl">
                    {item.source}
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold tracking-[0.15em] text-white/60 backdrop-blur-xl">
                    LIVE
                  </div>
                </div>
              </div>

              <div className="p-7">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                  {new Date(item.datetime * 1000).toLocaleString()}
                </p>

                <h3 className="line-clamp-2 text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-white/80">
                  {item.headline}
                </h3>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-500">
                  {item.summary}
                </p>

                <div className="mt-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 group-hover:gap-5 group-hover:text-white">
                  Explore Story
                  <span className="text-base">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}