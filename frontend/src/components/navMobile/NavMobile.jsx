import "./NavMobile.css";

export default function NavMobile() {
  const icon = [
    {
      src: "../src/assets/home.svg",
      alt: "home logo",
      id: 1,
      path: "/",
    },
    {
      src: "../src/assets/circle.svg",
      alt: "add circle logo",
      id: 3,
      path: "/upload",
    },
    {
      src: "../src/assets/profil.png",
      alt: "profile logo",
      id: 5,
      path: "/user",
    },
  ];

  return (
    <nav className="navmobile">
      {icon.map((element) => (
        <a href={element.path} className="aLink" key="id">
          <img
            src={element.src}
            alt={element.alt}
            className="icon"
            id={element.id}
          />
        </a>
      ))}
    </nav>
  );
}
