import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid justify-content-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuAdmin"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="menuAdmin">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/adminClases">Gestión Clases</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/adminInscripciones">Inscripciones</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;