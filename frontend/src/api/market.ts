import api from "./client";

export const getMarket = async () => {

  const res = await api.get("/market/global");

  return res.data;
};