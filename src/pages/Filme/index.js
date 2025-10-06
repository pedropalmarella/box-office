import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscaFilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "0508f250b7e076b70ff6a3c62880c301",
            language: "pt-BR",
          },
        })
        .then((resposta) => {
          setFilmes(resposta.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    buscaFilmes();
  }, [navigate, id]);

  function favoritarFilme() {
    const minhaLista = localStorage.getItem("@favfilmes");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filmes.id
    );

    if (hasFilme) {
      toast.warn("Esse filme já foi favoritado!");
      return;
    }

    filmesSalvos.push(filmes);
    localStorage.setItem("@favfilmes", JSON.stringify(filmesSalvos));
    console.log(filmesSalvos);
    toast.success("Filme favoritado com sucesso!");
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="bg">
      <div className="detalhe-container">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`}
            alt={filmes.title}
          />
        </div>

        <div className="info-box">
          <h1>{filmes.title}</h1>
          <h3>Sinopse</h3>
          <span>{filmes.overview}</span>
          <strong>Nota: {filmes.vote_average.toFixed(1)} / 10</strong>
          <div className="area-buttons">
            <button onClick={favoritarFilme}>FAVORITAR</button>
            <button>
              <a
                target="blank"
                rel="external"
                href={`https://youtube.com/results?search_query=${filmes.title} Trailer`}
              >
                TRAILER
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filme;
