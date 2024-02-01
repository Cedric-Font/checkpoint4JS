import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="mainNav">
      <div className="btnContainer">
        <Link to="/">
          <button type="button" className="btnNav">
            Acceuil
          </button>
        </Link>
        <Link to="/">
          <button type="button" className="btnNav">
            Profil
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="btnNav">
            Se Connecter
          </button>
        </Link>
      </div>
      <img className="profilImg" src="../src/assets/profil.png" alt="" />
    </div>
  );
}
