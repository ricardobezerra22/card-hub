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

export async function requestTrade(payload) {
  return await api.post("/trades", payload);
}
export async function addCardToDeck(payload) {
  return await api.post("/me/cards", payload);
}

export async function getRequestedCards(payload) {
  const queryParams = new URLSearchParams(payload).toString();
  const url = `/trades?${queryParams}`;
  return await api.get(url);
}
export async function deleteRequest(payload) {
  return await api.delete(`/trades/${payload}`);
}
