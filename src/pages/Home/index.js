import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1); // Estado para controlar a página atual

  useEffect(() => {
    async function buscaFilmes() {
      const configBusca = {
        params: {
          api_key: "0508f250b7e076b70ff6a3c62880c301",
          language: "pt-BR",
          page: pagina, // Usa o estado da página
        },
      };

      const resposta = await api
        .get("/movie/now_playing", configBusca)
        .then((resposta) => {
          setFilmes((prevFilmes) => [
            ...prevFilmes,
            ...resposta.data.results.slice(0, 9),
          ]); // Adiciona os novos filmes à lista existente
          console.log("DEU CERTO!");
        })
        .catch(() => console.log("ERRO NA API"));
    }

    buscaFilmes();
  }, [pagina]); // Executa a busca sempre que a página for alterada

  return (
    <div>
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <div className="caixa-titulo">
                <strong>{filme.title}</strong>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>

      {/* Botão de Ver Mais */}
      <div className="ver-mais-container">
        <button
          className="ver-mais"
          onClick={() => setPagina((prevPagina) => prevPagina + 1)} // Incrementa a página ao clicar
        >
          Mostrar outros
        </button>
      </div>
    </div>
  );
}

export default Home;
