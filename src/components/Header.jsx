import logoHorizontal from "../assets/rectangulo_liverpool.jpg";
import logoSquare from "../assets/cudrado_liverpool.jpg";

const Header = () => {
  return (
    <>
      <header
        className="d-flex align-items-center justify-content-center py-3"
        style={{ backgroundColor: "#D3006D" }}
      >
        <img
          src={logoHorizontal}
          alt="Liverpool"
          className="d-none d-md-block"
          style={{ height: "50px" }}
        />
        <img
          src={logoSquare}
          alt="Liverpool"
          className="d-md-none"
          style={{ height: "60px" }}
        />
      </header>
      <div
        className="text-center py-2 mb-4"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <h5 className="m-0" style={{ color: "#D3006D" }}>
          Gestión de pedidos — Liverpool
        </h5>
      </div>
    </>
  );
};

export default Header;
