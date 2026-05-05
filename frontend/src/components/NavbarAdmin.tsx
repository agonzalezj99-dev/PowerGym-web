import { NavLink } from "react-router-dom";

const NavbarAdmin = () => {
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
              <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" end>Gestión Clases</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/usuarios">Usuarios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/inscripciones">Inscripciones</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/consultas">Consultas</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;