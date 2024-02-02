import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch("http://localhost:3310/api/logout", {
        method: "get",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        // Log des détails de la réponse en cas d'échec
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };
  return (
    <div className="mainNav">
      <div className="btnContainer">
        <Link to="/">
          <button type="button" className="btnNav">
            Acceuil
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="btnNav" onClick={handleSubmit}>
            Se deconnecter
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
