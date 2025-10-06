import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscaFilmes() {
      const configBusca = {
        params: {
          api_key: "0508f250b7e076b70ff6a3c62880c301",
          language: "pt-BR",
          page: pagina,
        },
      };

      const resposta = await api
        .get("/movie/now_playing", configBusca)
        .then((resposta) => {
          setLoading(false);
          setFilmes((prevFilmes) => [
            ...prevFilmes,
            ...resposta.data.results.slice(0, 9),
          ]);
          console.log("DEU CERTO!");
        })
        .catch(() => console.log("ERRO NA API"));
    }

    buscaFilmes();
  }, [pagina]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
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
              <Link to={`/filme/${filme.id}`}>ACESSAR</Link>
            </article>
          );
        })}
      </div>

      <div className="ver-mais-container">
        <button
          className="ver-mais"
          onClick={() => setPagina((prevPagina) => prevPagina + 1)}
        >
          Mostrar outros
        </button>
      </div>
    </div>
  );
}

export default Home;
