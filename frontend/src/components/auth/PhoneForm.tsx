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

      <label className="text-sm text-gray-600">
        Phone number
      </label>

      <input
        placeholder="Enter phone number"
        className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
        value={phone}
        onChange={(e) =>
          setLocalPhone(e.target.value)
        }
      />

      <button
        className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        onClick={handleSend}
      >
        Send OTP
      </button>

    </div>
  );
}