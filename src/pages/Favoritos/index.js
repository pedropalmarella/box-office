import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./favoritos.css";
function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@favfilmes");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@favfilmes", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="bg">
      <div className="meus-filmes">
        <h1>Meus filmes</h1>

        {filmes.length === 0 && (
          <span>Você não possui nenhum filme salvo :( </span>
        )}

        <ul>
          {filmes.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.title}</span>

                <div>
                  <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                  <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Favoritos;
