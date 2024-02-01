/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import "./register.css";
import Donnees from "../donnéesFormulaire/DonnéesFormulaire";

function Register() {
  const donnees = Donnees();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch("http://localhost:3310/api/user", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: donnees.pseudo,
          firstname: donnees.firstname,
          lastname: donnees.lastname,
          mail: donnees.email,
          password: donnees.confirmPassword,
        }),
      });

      if (response.status === 500) {
        navigate("/connection");
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
      value: "pseudo",
      state: donnees.pseudo,
      text: "Pseudo",
      function: donnees.handleChangePseudo,
      small: donnees.falsePseudo,
    },
    {
      value: "firstname",
      state: donnees.firstname,
      text: "Prénom",
      function: donnees.handleChangeFirstname,
      small: donnees.falseFirstname,
    },
    {
      value: "lastname",
      state: donnees.lastname,
      text: "Nom de famille",
      function: donnees.handleChangeLastname,
      small: donnees.falseLastname,
    },
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
    {
      value: "confirmPassword",
      state: donnees.confirmPassword,
      text: "Confirmez votre mot de passe",
      function: donnees.handleChangeConfirmPassword,
      small: donnees.falseConfirmPassword,
    },
  ];

  return (
    <div className="inscription">
      <div className="inscription__mainElement">
        <img
          className="inscription__mainElement__desktopImg"
          src="./src/assets/image-login.jpg"
          alt=""
        />
        <img
          className="inscription__mainElement__mobileImg"
          src="./src/assets/logop3.svg"
          alt=""
        />
        <div className="inscription__mainElement__formConteneur">
          <h1 className="inscription__mainElement__formConteneur__title">
            Inscrivez vous
          </h1>
          <form
            action=""
            method="post"
            className="inscription__mainElement__formConteneur__formulaire"
          >
            {ranges.map((e) => (
              <div className="inscription__mainElement__formConteneur__formulaire__range">
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
                />
                {e.small}
              </div>
            ))}
            <div className="inscription__mainElement__formConteneur__formulaire__range">
              <button
                className="inscription__mainElement__formConteneur__formulaire__button"
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

export default Register;
