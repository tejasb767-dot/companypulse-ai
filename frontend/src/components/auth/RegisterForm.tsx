import { useState } from "react";
import { registerUser } from "../../api/auth";
import CountrySelector from "./CountrySelector";

export default function RegisterForm({
  phone,
  setStep,
}: any) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const handleRegister = async () => {
    await registerUser(phone, name, country);

    alert("Welcome");
    setStep("phone");
  };

  return (
    <div>
      <h2 className="mb-5 text-xl font-bold text-white">
        Create Account
      </h2>

      <input
        placeholder="Your name"
        className="
          mb-4
          w-full
          rounded-2xl
          border border-white/10
          bg-white/[0.05]
          px-4 py-3
          text-white
          placeholder:text-gray-500
          outline-none
          transition-all duration-300
          focus:border-cyan-400/50
          focus:bg-white/[0.08]
          focus:ring-2 focus:ring-cyan-500/20
        "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <CountrySelector
        setCountry={setCountry}
        selectedCountry={country}
      />

      <button
        className="
          mt-5
          w-full
          rounded-2xl
          bg-gradient-to-r from-purple-500 to-fuchsia-600
          px-4 py-3
          font-semibold text-white
          transition-all duration-300
          hover:scale-[1.02]
          hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]
        "
        onClick={handleRegister}
      >
        Create Account
      </button>
    </div>
  );
}