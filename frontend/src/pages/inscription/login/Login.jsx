/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import "./login.css";
import Donnees from "../donnéesFormulaire/DonnéesFormulaire";

export default function Login() {
  const donnees = Donnees();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch("http://localhost:3310/api/login", {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: donnees.email,
          password: donnees.password,
        }),
      });

      if (response.status === 200) {
        navigate("/");
      } else {
        // Log des détails de la réponse en cas d'échec
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  const ranges = [
    {
      value: "email",
      state: donnees.email,
      text: "Email",
      function: donnees.handleChangeEmail,
      small: donnees.falseEmail,
    },
    {
      value: "password",
      state: donnees.password,
      text: "Mot de passe",
      function: donnees.handleChangePassword,
      small: donnees.falsePassword,
    },
  ];

  return (
    <div className="inscription">
      <div className="inscription__mainElement">
        <div className="inscription__mainElement__desktopImg">
          <h2>Welcome</h2>
        </div>
        <div className="inscription__mainElement__formConteneur">
          <h1 className="inscription__mainElement__formConteneur__titles">
            Login
          </h1>
          <form
            action=""
            method="post"
            className="inscription__mainElement__formConteneur__formulaire"
          >
            {ranges.map((e) => (
              <div
                key={e.text}
                className="inscription__mainElement__formConteneur__formulaire__range"
              >
                <label htmlFor={e.value}>{e.text}</label>
                <input
                  type={
                    e.value === "password" || e.value === "confirmePassword"
                      ? "password"
                      : "text"
                  }
                  name={e.value}
                  id={e.value}
                  value={e.state}
                  onChange={e.function}
                  required
                  className="inputForm"
                  autoComplete="password"
                />
                {e.small}
              </div>
            ))}
            <div className="inscription__mainElement__formConteneur__formulaire__range">
              <button
                className="inscription__mainElement__formConteneur__formulaire__buttons"
                type="submit"
                onClick={handleSubmit}
              >
                Inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
