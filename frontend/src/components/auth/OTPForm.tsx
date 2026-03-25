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

      <label className="text-sm text-gray-600">
        Enter OTP
      </label>

      <input
        className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
      />

      <button
        className="mt-4 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        onClick={handleVerify}
      >
        Verify
      </button>

    </div>
  );
}