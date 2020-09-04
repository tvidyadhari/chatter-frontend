import axios from "axios";

export async function login({ email, password }) {
  const { at, user, following } = await axios.post("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("at", at);
  return { user, following };
}

export async function signup({ email, password, username, fullname }) {
  return await axios.post("/auth/signup", {
    email,
    password,
    username,
    fullname,
  });
}

export async function refreshToken() {
  const { at } = await axios.post("/auth/refresh");
  localStorage.setItem("at", at);
  return true;
}

export async function logout() {
  localStorage.removeItem("at");
  return await axios.delete("/auth/logout");
}
