import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Box Office
      </Link>
      <Link className="Favoritos" to="/favoritos">
        Meus Favoritos
      </Link>
    </header>
  );
}

export default Header;
