import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="limite">
        <Link className="logo" to="/">
          Box Office
        </Link>
        <Link className="favoritos" to="/favoritos">
          Meus Favoritos
        </Link>
      </div>
    </header>
  );
}

export default Header;
