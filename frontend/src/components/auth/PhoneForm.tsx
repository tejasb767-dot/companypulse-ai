import { useState } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function PhoneForm({
  setStep,
}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email);

      alert("Welcome back!");
      navigate("/");
    } catch {
      alert("Invalid account. Please create an account.");
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-300">
        Email
      </label>

      <input
        type="email"
        placeholder="Enter your email"
        className="
          mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05]
          px-4 py-3 text-white placeholder:text-gray-500 outline-none
          transition-all duration-300 focus:border-cyan-400/50
          focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20
        "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="mt-4 block text-sm font-medium text-gray-300">
        Password
      </label>

      <input
        type="password"
        placeholder="Enter your password"
        className="
          mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05]
          px-4 py-3 text-white placeholder:text-gray-500 outline-none
          transition-all duration-300 focus:border-cyan-400/50
          focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20
        "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="
          mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600
          px-4 py-3 font-semibold text-white transition-all duration-300
          hover:scale-[1.02]
        "
        onClick={handleLogin}
      >
        Login
      </button>

      <div className="mt-5 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          onClick={() => setStep("register")}
          className="font-semibold text-cyan-400 hover:text-white"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}