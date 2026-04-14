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

        setNews(data.slice(0, 12));
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
    <section className="w-full max-w-7xl px-6 mt-32 mb-20 z-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">
            Latest Market News
          </h2>
          <p className="mt-2 text-gray-600 text-lg">
            Live financial updates, earnings, markets and company headlines.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/80 border border-green-200 rounded-full px-4 py-2 shadow-sm w-fit">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold text-gray-700">
            Live from Finnhub
          </span>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden bg-white/80 shadow-lg animate-pulse"
            >
              <div className="h-56 bg-gray-300" />
              <div className="p-6">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
                <div className="h-4 bg-gray-300 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl bg-red-50 border border-red-200 p-8 text-center shadow-md">
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            Could not load news
          </h3>
          <p className="text-gray-700">{error}</p>

          <div className="mt-4 text-sm text-gray-500">
            Make sure your file contains:
          </div>

          <pre className="mt-3 inline-block rounded-xl bg-gray-900 text-green-400 px-4 py-3 text-left text-sm">
{`VITE_FINNHUB_API_KEY=your_actual_finnhub_key`}
          </pre>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl bg-white/85 border border-white/60 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    item.image && item.image.length > 0
                      ? item.image
                      : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={item.headline}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.source}
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-3">
                  {new Date(item.datetime * 1000).toLocaleString()}
                </p>

                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.headline}
                </h3>

                <p className="mt-4 text-gray-600 text-sm leading-6 line-clamp-4">
                  {item.summary}
                </p>

                <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Read full article →
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}