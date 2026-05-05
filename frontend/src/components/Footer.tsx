import { useLanguage } from "../context/LanguageContext";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h3>PowerGym</h3>
          <p>{t("footer.description")}</p>
        </div>

        <div className="footer-col">
          <h3>{t("footer.links")}</h3>
          <ul className="footer-links">
            <li><NavLink to="/">{t("nav.home")}</NavLink></li>
            <li><NavLink to="/horarios">{t("nav.schedule")}</NavLink></li>
            <li><NavLink to="/registro">{t("common.register")}</NavLink></li>
            <li><NavLink to="/contacto">{t("nav.contact")}</NavLink></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t("footer.contact")}</h3>
          <p>📍 {t("footer.contactAddress")}</p>
          <p>📞 {t("footer.contactPhone")}</p>
          <p>✉️ {t("footer.contactEmail")}</p>
        </div>

        <div className="footer-col">
          <h3>{t("footer.schedule")}</h3>
          <p>{t("footer.scheduleWeek")}</p>
          <p>{t("footer.scheduleSat")}</p>
          <p>{t("footer.scheduleSun")}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {t("footer.copyright")}. {t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
