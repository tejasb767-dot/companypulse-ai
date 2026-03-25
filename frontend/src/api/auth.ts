import api from "./client";

export async function sendOTP(mobile: string) {
  const res = await api.post("/auth/send-otp", {
    mobile,
  });

  return res.data;
}


export async function verifyOTP(mobile: string, otp: string) {
  const res = await api.post("/auth/verify-otp", {
    mobile,
    otp,
  });

  return res.data;
}


export async function registerUser(
  mobile: string,
  name: string,
  country: string
) {
  const res = await api.post("/auth/register", {
    mobile,
    name,
    country,
  });

  return res.data;
}