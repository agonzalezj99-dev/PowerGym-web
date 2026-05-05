import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const { t } = useLanguage();

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
            <li className="nav-item"><NavLink className="nav-link" to="/">{t("nav.home")}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/horarios">{t("nav.schedule")}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">{t("nav.contact")}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/rutinas">🤖 {t("nav.routines")}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/inscripciones">{t("nav.enrollments")}</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;