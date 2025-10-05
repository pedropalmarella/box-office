import axios from "axios";

//base da URL: https://api.themoviedb.org/3
//URL da API: /movie/now_playing?
// api_key=0508f250b7e076b70ff6a3c62880c301&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
