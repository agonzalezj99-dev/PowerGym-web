import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  subtitle: string;
}

const Header = ({ subtitle }: HeaderProps) => {
  const { isDark, toggleDark } = useDarkMode();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    navigate("/");
  };

  return (
    <header>
      <button id="modoBoton" onClick={toggleDark} aria-label="Toggle dark mode">
        <span className="material-icons-outlined">
          {isDark ? "light_mode" : "dark_mode"}
        </span>
      </button>

      <h1>PowerGym</h1>
      <p>{subtitle}</p>

      <div className="header-auth">
        {token ? (
          <>
            <span className="header-nombre">{t("header.greeting").replace("{name}", nombre || "")}</span>
            <button className="header-btn" onClick={handleLogout}>{t("common.logout")}</button>
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