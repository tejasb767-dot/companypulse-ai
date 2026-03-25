import api from "./client";

export async function searchCompany(q: string) {

  const res = await api.get("/search", {
    params: { q },
  });

  return res.data;
}