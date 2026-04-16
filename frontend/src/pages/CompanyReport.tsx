import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CompanyReport() {
  const { symbol } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let timer: any;

    async function load() {
      try {
        const res = await api.get(`/company/${symbol}`);
        setData(res.data);

        if (res.data.ai_status === "generating") {
          timer = setTimeout(load, 2000);
        }
      } catch (e) {
        console.log(e);
      }
    }

    load();

    return () => clearTimeout(timer);
  }, [symbol]);

  if (!data) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black backdrop-blur-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full bg-white/5 animate-ping" />

          <div className="absolute h-36 w-36 rounded-full border-2 border-white/20 border-t-white animate-spin" />

          <div
            className="absolute h-28 w-28 rounded-full border-2 border-green-400/40 border-b-transparent animate-spin"
            style={{
              animationDirection: "reverse",
              animationDuration: "2s",
            }}
          />

          <div className="h-16 w-16 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.4)]" />
        </div>

        <div className="mt-10 text-2xl font-bold text-white animate-pulse">
          CompanyPulse AI generating report...
        </div>

        <div className="mt-2 text-gray-500">
          Analyzing company data and building insights
        </div>
      </div>
    );
  }

  const chartData =
    data.chart &&
    data.chart.t &&
    data.chart.c &&
    data.chart.t.length > 0
      ? data.chart.t.map((t: number, i: number) => ({
          time: new Date(t * 1000).toLocaleDateString(),
          price: data.chart.c[i],
        }))
      : [];

  return (
    <div className="min-h-screen w-full bg-black px-8 py-10 text-white">
      {/* Header */}
      <div className="mb-10 flex items-center gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
          <img src={data.company.logo} className="h-10 w-10 object-contain" />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-black tracking-tight text-white">
            {data.company.name}
          </h1>

          <div className="mt-1 text-lg text-gray-500">
            {data.company.ticker}
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-black text-white">
            ${data.price.current}
          </div>

          <div
            className={`mt-2 text-2xl font-bold ${
              data.price.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {data.price.change} ({data.price.percent}%)
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Box title="PE" value={data.valuation.pe} />
        <Box title="EPS" value={data.performance.eps} />
        <Box title="ROE" value={data.performance.roe} />
        <Box title="Beta" value={data.safety.beta} />
      </div>

      {/* Chart */}
      <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Price Chart (5Y)
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Historical company performance over the last 5 years
            </p>
          </div>

          <div className="rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-400">
            Live Trend
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No chart data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#27272a" }}
                tickLine={{ stroke: "#27272a" }}
              />

              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#27272a" }}
                tickLine={{ stroke: "#27272a" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0b0b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9ca3af" }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Section title="Valuation" data={data.valuation} />
        <Section title="Performance" data={data.performance} />
        <Section title="Safety" data={data.safety} />
        <Section title="52W Range" data={data.range} />
      </div>

      {/* AI Summary */}
      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

          <h2 className="text-2xl font-bold text-white">
            AI Summary
          </h2>
        </div>

        <div className="max-w-4xl text-lg leading-8 text-gray-300">
          {data.summary}
        </div>
      </div>
    </div>
  );
}

function Box({ title, value }: any) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
        {title}
      </div>

      <div className="mt-3 text-3xl font-black text-white">
        {value ?? "-"}
      </div>
    </div>
  );
}

function Section({ title, data }: any) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <h2 className="mb-6 text-2xl font-bold text-white">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {Object.keys(data).map((k) => (
          <div
            key={k}
            className="rounded-2xl border border-white/5 bg-black/30 p-4"
          >
            <div className="text-sm uppercase tracking-[0.15em] text-gray-500">
              {k.replaceAll("_", " ")}
            </div>

            <div className="mt-2 text-xl font-bold text-white">
              {data[k] ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}