import { Link } from "react-router-dom";
import "./erro.css";

function Erro() {
  return (
    <div className="erro">
      <h1>Página não encontrada...</h1>
      <h2>Erro 404</h2>
      <Link className="Home" to="/">
        Home
      </Link>
    </div>
  );
}

export default Erro;
