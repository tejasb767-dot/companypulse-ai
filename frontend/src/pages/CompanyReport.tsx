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

        // ✅ keep calling until AI ready
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

    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">

      {/* AI Core */}
      <div className="relative flex items-center justify-center">

        {/* outer glow */}
        <div className="absolute w-40 h-40 rounded-full bg-blue-500 opacity-20 animate-ping"></div>

        {/* ring 1 */}
        <div className="absolute w-36 h-36 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        {/* ring 2 */}
        <div className="absolute w-28 h-28 border-4 border-blue-600 border-b-transparent rounded-full animate-spin"
             style={{ animationDirection: "reverse", animationDuration: "2s" }}
        ></div>

        {/* core */}
        <div className="w-16 h-16 bg-blue-600 rounded-full shadow-[0_0_40px_#3b82f6]"></div>

      </div>


      {/* text */}
      <div className="mt-10 text-2xl font-bold text-blue-400 animate-pulse">
        CompanyPulse AI generating report…
      </div>


      {/* sub text */}
      <div className="mt-2 text-gray-300">
        On the way… please wait
      </div>


      {/* dots */}
      <div className="flex gap-2 mt-6">

        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></div>

      </div>


      {/* scanning line */}
      <div className="mt-8 w-64 h-1 bg-gray-700 overflow-hidden rounded">

        <div className="h-full w-20 bg-blue-500 animate-[scan_2s_linear_infinite]"></div>

      </div>

    </div>

  );
}

  // ✅ convert backend candle → recharts format

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

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex items-center gap-4">

        <img
          src={data.company.logo}
          className="w-12 h-12"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {data.company.name}
          </h1>

          <div className="text-gray-500">
            {data.company.ticker}
          </div>

        </div>

      </div>



      {/* PRICE */}

      <div className="text-2xl font-bold">

        ${data.price.current}

        <span
          className={
            data.price.change >= 0
              ? "text-green-600 ml-2"
              : "text-red-600 ml-2"
          }
        >
          {data.price.change} ({data.price.percent}%)
        </span>

      </div>



      {/* CARDS */}

      <div className="grid grid-cols-4 gap-4">

        <Box title="PE" value={data.valuation.pe} />
        <Box title="EPS" value={data.performance.eps} />
        <Box title="ROE" value={data.performance.roe} />
        <Box title="Beta" value={data.safety.beta} />

      </div>



      {/* CHART */}

      <div className="bg-white p-4 rounded shadow">

        <h2 className="font-bold mb-2">
          Price chart (5Y)
        </h2>

        {chartData.length === 0 ? (

          <div>No chart data</div>

        ) : (

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        )}

      </div>



      {/* VALUATION */}

      <Section
        title="Valuation"
        data={data.valuation}
      />


      {/* PERFORMANCE */}

      <Section
        title="Performance"
        data={data.performance}
      />


      {/* SAFETY */}

      <Section
        title="Safety"
        data={data.safety}
      />


      {/* RANGE */}

      <Section
        title="52W Range"
        data={data.range}
      />


      {/* AI */}

      <div className="bg-white p-4 rounded shadow">

        <h2 className="font-bold mb-2">
          AI Summary
        </h2>

        <div>

          {data.summary}

        </div>

      </div>

    </div>

  );

}



function Box({ title, value }: any) {

  return (

    <div className="bg-white p-4 rounded shadow">

      <div className="text-gray-500">
        {title}
      </div>

      <div className="text-xl font-bold">
        {value ?? "-"}
      </div>

    </div>

  );

}



function Section({ title, data }: any) {

  return (

    <div className="bg-white p-4 rounded shadow">

      <h2 className="font-bold mb-2">
        {title}
      </h2>

      <div className="grid grid-cols-3 gap-3">

        {Object.keys(data).map((k) => (

          <div key={k}>

            <div className="text-gray-500">
              {k}
            </div>

            <div className="font-bold">
              {data[k] ?? "-"}
            </div>

          </div>

        ))}

      </div>

    </div>

  );

}