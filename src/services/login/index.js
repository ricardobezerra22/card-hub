import api from "@/services/api/http";

export async function userRegister(payload) {
  return await api.post("/register", payload);
}

export async function userLogin(payload) {
  const response = await api.post("/login", payload);
  const { token } = response.data;

  localStorage.setItem("token", token);

  return response;
}
export function userLogout() {
  localStorage.removeItem("token");
}
export async function getMyCards() {
  return await api.get("/me");
}
export async function getAllCards(payload) {
  const queryParams = new URLSearchParams(payload).toString();
  const url = `/cards?${queryParams}`;
  return await api.get(url);
}
