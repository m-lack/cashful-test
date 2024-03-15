import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
});

if (typeof window !== "undefined") {
  API.defaults.headers.common["Authorization"] =
    window.localStorage.getItem("token") || "";
}

export default API;
