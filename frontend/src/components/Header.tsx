import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate, NavLink } from "react-router-dom";
import { useLanguage, type Language } from "../context/LanguageContext";

interface HeaderProps {
  subtitle: string;
}

const supportedLanguages: Language[] = ["es", "en", "fr"];

const languageIcons: Record<Language, React.ReactNode> = {
  es: (
    <svg viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="512" height="336" fill="#AA151B" />
      <rect y="96" width="512" height="144" fill="#F1BF00" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
      <rect x="25" width="10" height="30" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#fff" />
      <rect x="27" width="6" height="30" fill="#C8102E" />
      <rect y="12" width="60" height="6" fill="#C8102E" />
    </svg>
  ),
  fr: (
    <svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden preserveAspectRatio="none">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  ),
};

const codeLabels: Record<Language, string> = {
  es: "ES",
  en: "GB",
  fr: "FR",
};

const Header = ({ subtitle }: HeaderProps) => {
  const { isDark, toggleDark } = useDarkMode();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");
  const rol = localStorage.getItem("rol");

  const currentLanguage = (supportedLanguages.includes(language) ? language : "es") as Language;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    navigate("/");
  };

  return (
    <header>
      <div className="header-left">
        <button id="modoBoton" onClick={toggleDark} aria-label="Toggle dark mode">
          <span className="material-icons-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <div className="language-switch">
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              type="button"
              className={`language-btn ${currentLanguage === lang ? "active" : ""}`}
              onClick={() => setLanguage(lang)}
              title={lang === "es" ? "Español" : lang === "en" ? "English" : "Français"}
            >
              <span className="flag-wrap">
                <span className="lang-code">{codeLabels[lang]}</span>
                {languageIcons[lang]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="header-center">
        <h1>PowerGym</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-right">
        {token ? (
          <>
            {rol !== "admin" && (
              <NavLink to="/notificaciones" className="header-btn header-notif">
                🔔
              </NavLink>
            )}
            {rol === "admin" && (
              <NavLink to="/notificaciones" className="header-btn header-notif">
                🔔
              </NavLink>
            )}
            <NavLink to="/perfil" className="header-nombre">
              👤 {nombre || t("common.guest")}
            </NavLink>
            <button className="header-btn" onClick={handleLogout}>
              {t("common.logout")}
            </button>
          </>
        ) : (
          <>
            <button className="header-btn" onClick={() => navigate("/login")}>{t("common.login")}</button>
            <button className="header-btn" onClick={() => navigate("/registro")}>{t("common.register")}</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;