import { useState } from "react";
import { sendOTP, registerUser } from "../../api/auth";
import CountrySelector from "./CountrySelector";

export default function RegisterForm({
  setStep,
  setEmail,
}: any) {
  const [email, setLocalEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");

  const [sent, setSent] = useState(false);

  const handleSendOTP = async () => {
    try {
      const response = await sendOTP(email);

      if (!response.success) {
        alert(response.message || "Account already exists. Please login.");
        return;
      }

      setEmail(email);
      setSent(true);
    } catch {
      alert("Unable to send OTP");
    }
  };

  const handleVerify = () => {
    if (otp.length >= 4) {
      setOtpVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleCreate = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(email, password, country);

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("isLoggedIn", "true");
      }

      alert("Account created successfully!");
      setStep("login");
    } catch {
      alert("Unable to create account");
    }
  };

  return (
    <div>
      <h2 className="mb-5 text-xl font-bold text-white">
        Create Account
      </h2>

      <label className="text-sm font-medium text-gray-300">
        Email
      </label>

      <input
        type="email"
        placeholder="Enter your email"
        className="
          mt-2 mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.05]
          px-4 py-3 text-white placeholder:text-gray-500 outline-none
          focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20
        "
        value={email}
        onChange={(e) => setLocalEmail(e.target.value)}
      />

      {!sent && (
        <button
          onClick={handleSendOTP}
          className="
            mb-4 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600
            px-4 py-3 font-semibold text-white
          "
        >
          Send OTP
        </button>
      )}

      {sent && !otpVerified && (
        <>
          <input
            placeholder="Enter OTP"
            className="
              mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.05]
              px-4 py-3 text-white placeholder:text-gray-500 outline-none
            "
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerify}
            className="
              mb-4 w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600
              px-4 py-3 font-semibold text-white
            "
          >
            Verify OTP
          </button>
        </>
      )}

      {otpVerified && (
        <>
          <input
            type="password"
            placeholder="Create password"
            className="
              mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.05]
              px-4 py-3 text-white placeholder:text-gray-500 outline-none
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="
              mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.05]
              px-4 py-3 text-white placeholder:text-gray-500 outline-none
            "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <CountrySelector
            setCountry={setCountry}
            selectedCountry={country}
          />

          <button
            disabled={
              !password ||
              !confirmPassword ||
              !country
            }
            onClick={handleCreate}
            className="
              mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600
              px-4 py-3 font-semibold text-white transition-all
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            Create Account
          </button>
        </>
      )}

      <div className="mt-5 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={() => setStep("login")}
          className="font-semibold text-cyan-400 hover:text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}