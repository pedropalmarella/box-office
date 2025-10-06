import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscaFilme() {
      try {
        const resposta = await api.get(`/movie/${id}`);

        setFilme(resposta.data);
      } catch (error) {
        console.log("ERRO AO BUSCAR FILME:", error);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    buscaFilme();
  }, [navigate, id]);

  function favoritarFilme() {
    const minhaLista = localStorage.getItem("@favfilmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme já foi favoritado!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@favfilmes", JSON.stringify(filmesSalvos));
    toast.success("Filme favoritado com sucesso!");
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="bg">
      <div className="detalhe-container">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
            alt={filme.title}
          />
        </div>

        <div className="info-box">
          <h1>{filme.title}</h1>
          <h3>Sinopse</h3>
          <span>{filme.overview}</span>
          <strong>Nota: {filme.vote_average?.toFixed(1)} / 10</strong>
          <div className="area-buttons">
            <button onClick={favoritarFilme}>FAVORITAR</button>
            <button>
              <a
                target="blank"
                rel="external"
                href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
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
