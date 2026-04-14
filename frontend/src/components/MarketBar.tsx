import { useState, useEffect} from "react";
import { getMarket } from "../api/market";

type Item = {
  name: string;
  price: number;
  change: number;
};

export default function MarketBar() {

  const [data, setData] = useState<any[]>([]);

    useEffect(() => {

      const load = async () => {

        const d = await getMarket();

        setData(d);
      };

      load();

      const t = setInterval(load, 60000);

      return () => clearInterval(t);

    }, []);
  const loopData = [...data, ...data]; // continuous loop

  return (

    <div className="bg-black text-white overflow-hidden">

      <div className="ticker">

        {loopData.map((i, index) => (

          <div key={index} className="ticker-item">

            <span className="name">
              {i.name}
            </span>

            <span className="price">
              {i.price}
            </span>

            <span
              className={
                i.change >= 0
                  ? "change up"
                  : "change down"
              }
            >
              {i.change}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
} 