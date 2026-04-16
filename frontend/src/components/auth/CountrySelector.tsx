import { useState } from "react";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "Canada",
  "Australia",
];

export default function CountrySelector({
  setCountry,
  selectedCountry,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 relative">
      <div
        className="
          flex w-full items-center justify-between
          rounded-2xl
          border border-white/10
          bg-white/[0.05]
          px-4 py-3
          text-white
          cursor-pointer
          transition-all duration-300
          hover:bg-white/[0.08]
          hover:border-white/20
        "
        onClick={() => setOpen(!open)}
      >
        <span className={selectedCountry ? "text-white" : "text-gray-500"}>
          {selectedCountry || "Select country"}
        </span>

        <span className="text-gray-400">
          {open ? "▲" : "▼"}
        </span>
      </div>

      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full overflow-hidden
            rounded-2xl
            border border-white/10
            bg-[#0f1117]
            shadow-[0_20px_50px_rgba(0,0,0,0.6)]
            backdrop-blur-2xl
          "
        >
          {countries.map((c, i) => (
            <div
              key={i}
              className="
                cursor-pointer
                px-4 py-3
                text-gray-300
                transition-all duration-200
                hover:bg-white/10
                hover:text-white
              "
              onClick={() => {
                setCountry(c);
                setOpen(false);
              }}
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}