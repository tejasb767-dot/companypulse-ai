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

    await registerUser(
      phone,
      name,
      country
    );

    alert("Welcome");

    setStep("phone");
  };

  return (

    <div>

      <h2 className="text-xl mb-4">
        New User
      </h2>

      <input
        placeholder="Name"
        className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <CountrySelector
        setCountry={setCountry}
      />

      <button
        className="mt-4 w-full bg-purple-600 text-white p-3 rounded-lg"
        onClick={handleRegister}
      >
        Register
      </button>

    </div>
  );
}