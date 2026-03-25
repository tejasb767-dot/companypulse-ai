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
}: any) {

  const [open, setOpen] = useState(false);

  return (

    <div className="mb-3">

      <div
        className="border p-3 rounded-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Select country
      </div>

      {open && (

        <div className="border rounded-lg mt-1 bg-white max-h-40 overflow-y-auto">

          {countries.map((c, i) => (

            <div
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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