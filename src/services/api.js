import axios from "axios";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: apiKey,
    language: "pt-BR",
  };
  return config;
});

export default api;
