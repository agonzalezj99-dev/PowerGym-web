import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const supportedLanguages = ["es", "en", "fr"] as const;

const Navbar = () => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const { language, setLanguage, t } = useLanguage();
  const currentLanguage = supportedLanguages.includes(language as (typeof supportedLanguages)[number])
    ? (language as (typeof supportedLanguages)[number])
    : "es";

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

        <div className="language-switch" aria-label={t("nav.language")}>
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              type="button"
              className={`language-btn ${currentLanguage === lang ? "active" : ""}`}
              onClick={() => setLanguage(lang)}
              aria-label={lang.toUpperCase()}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="collapse navbar-collapse justify-content-center" id="menu">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/">{t("nav.home")}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/horarios">{t("nav.schedule")}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">{t("nav.contact")}</NavLink></li>
            {token && rol !== "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/inscripciones">{t("nav.enrollments")}</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;