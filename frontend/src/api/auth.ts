import api from "./client";

export async function sendOTP(email: string) {
  const res = await api.post("/auth/send-otp", {
    email,
  });

  return res.data;
}

export async function verifyOTP(email: string, otp: string) {
  const res = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return res.data;
}

export async function registerUser(
  email: string,
  password: string,
  country: string
) {
  const res = await api.post("/auth/register", {
    email,
    password,
    country,
  });

  return res.data;
}

export async function loginUser(
  email: string,
  password: string
) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
}