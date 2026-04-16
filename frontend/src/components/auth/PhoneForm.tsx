import { useState } from "react";
import { sendOTP } from "../../api/auth";

export default function PhoneForm({
  setStep,
  setPhone,
}: any) {
  const [phone, setLocalPhone] = useState("");

  const handleSend = async () => {
    await sendOTP(phone);

    setPhone(phone);
    setStep("otp");
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-300">
        Phone number
      </label>

      <input
        placeholder="Enter phone number"
        className="
          mt-2
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
        value={phone}
        onChange={(e) => setLocalPhone(e.target.value)}
      />

      <button
        className="
          mt-5
          w-full
          rounded-2xl
          bg-gradient-to-r from-cyan-500 to-blue-600
          px-4 py-3
          font-semibold text-white
          transition-all duration-300
          hover:scale-[1.02]
          hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
        "
        onClick={handleSend}
      >
        Send OTP
      </button>
    </div>
  );
}