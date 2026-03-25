import { useState } from "react";
import { motion } from "framer-motion";

import PhoneForm from "../components/auth/PhoneForm";
import OTPForm from "../components/auth/OTPForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Login() {

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");

  return (

    <div className="min-h-[80vh] flex items-center bg-gradient-to-b from-gray-100 to-gray-200">

      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 gap-10 px-10">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >

          <h1 className="text-5xl font-bold mb-6">
            Welcome back!
          </h1>

          <p className="text-gray-600 text-lg">
            Login to your account using your phone number.
          </p>

          <p className="mt-4 text-gray-600">
            Don't have an account?
            <span className="text-blue-600 ml-1 cursor-pointer">
              Register for free.
            </span>
          </p>

          <div className="mt-20 text-gray-500 italic">
            “I started investing at the age of 11. I was late.”
          </div>

          <div className="mt-2 font-semibold">
            Warren Buffett
          </div>

        </motion.div>

        {/* RIGHT */}

        <div className="flex justify-center">

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              bg-white/80
              backdrop-blur-lg
              shadow-2xl
              rounded-xl
              p-8
              w-[380px]
            "
          >

            <h2 className="text-lg font-semibold mb-4">
              Login
            </h2>

            {step === "phone" && (
              <PhoneForm
                setStep={setStep}
                setPhone={setPhone}
              />
            )}

            {step === "otp" && (
              <OTPForm
                phone={phone}
                setStep={setStep}
              />
            )}

            {step === "register" && (
              <RegisterForm
                phone={phone}
                setStep={setStep}
              />
            )}

          </motion.div>

        </div>

      </div>

    </div>
  );
}