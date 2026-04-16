import { useState } from "react";
import { motion } from "framer-motion";

import PhoneForm from "../components/auth/PhoneForm";
import OTPForm from "../components/auth/OTPForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Login() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-120px)] w-full max-w-7xl grid-cols-1 gap-16 px-8 py-16 lg:grid-cols-2 lg:px-16">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
            <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
              Secure Login
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-tight text-white md:text-7xl">
            Welcome back
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Access real-time stock insights, AI generated company analysis and
            your personal investment dashboard.
          </p>

          <div className="mt-8 flex items-center gap-2 text-gray-400">
            <span>Don't have an account?</span>

            <button
              onClick={() => setStep("register")}
              className="font-semibold text-cyan-400 transition hover:text-white"
            >
              Register for free →
            </button>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
              <div className="text-3xl font-black text-white">10K+</div>
              <div className="mt-1 text-sm text-gray-500">
                Companies Tracked
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
              <div className="text-3xl font-black text-green-400">24/7</div>
              <div className="mt-1 text-sm text-gray-500">Live Market Feed</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
              <div className="text-3xl font-black text-cyan-400">AI</div>
              <div className="mt-1 text-sm text-gray-500">
                Instant Insights
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
            <div className="text-lg italic leading-8 text-gray-400">
              “I started investing at the age of 11. I was late.”
            </div>

            <div className="mt-4 text-base font-bold text-white">
              Warren Buffett
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-green-500/5" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_18px_rgba(74,222,128,0.9)]" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {step === "phone" && "Login"}
                    {step === "otp" && "Verify OTP"}
                    {step === "register" && "Create Account"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Continue securely with your phone number
                  </p>
                </div>
              </div>

              {step === "phone" && (
                <PhoneForm setStep={setStep} setPhone={setPhone} />
              )}

              {step === "otp" && (
                <OTPForm phone={phone} setStep={setStep} />
              )}

              {step === "register" && (
                <RegisterForm phone={phone} setStep={setStep} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}