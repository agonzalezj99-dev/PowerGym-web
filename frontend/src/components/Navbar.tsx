import { NavLink } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid justify-content-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="menu">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/horarios">Horarios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            {token && rol !== "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/inscripciones">Inscripciones</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;