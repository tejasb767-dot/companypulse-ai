import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCompany } from "../api/search";

export default function SearchBox() {

  const [text, setText] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const navigate = useNavigate();


  async function onChange(e: any) {

    const value = e.target.value;

    setText(value);

    if (value.length < 1) {
      setResults([]);
      return;
    }

    try {

      const res = await searchCompany(value);

      if (Array.isArray(res)) {
        setResults(res);
      } else {
        setResults([]);
      }

    } catch (err) {

      console.log(err);
      setResults([]);

    }
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

    <div className="w-full max-w-xl mx-auto relative">

      <input
        value={text}
        onChange={onChange}
        onKeyDown={onKey}
        placeholder="Search company..."
        className="w-full p-4 rounded-xl shadow-lg"
      />


      {results.length > 0 && (

        <div className="absolute bg-white w-full shadow-lg rounded z-50">

          {results.map((r, i) => (

            <div
              key={i}
              onClick={() => selectCompany(r.symbol)}
              className="p-3 border-b hover:bg-gray-100 cursor-pointer"
            >
              {r.symbol} — {r.description}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}