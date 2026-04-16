import { useState } from "react";
import { verifyOTP } from "../../api/auth";

export default function OTPForm({
  phone,
  setStep,
}: any) {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const res = await verifyOTP(phone, otp);

    if (res.new_user) {
      setStep("register");
    } else {
      alert("Welcome");
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-300">
        Enter OTP
      </label>

      <input
        placeholder="Enter OTP"
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
          focus:border-green-400/50
          focus:bg-white/[0.08]
          focus:ring-2 focus:ring-green-500/20
        "
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="
          mt-5
          w-full
          rounded-2xl
          bg-gradient-to-r from-green-500 to-emerald-600
          px-4 py-3
          font-semibold text-white
          transition-all duration-300
          hover:scale-[1.02]
          hover:shadow-[0_0_30px_rgba(74,222,128,0.35)]
        "
        onClick={handleVerify}
      >
        Verify OTP
      </button>
    </div>
  );
}