import { useLanguage } from "../context/LanguageContext";

const FooterAdmin = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="footer-admin-content">
        <p>© {t("footer.copyright")}. {t("footer.admin")}</p>
        <p style={{ fontSize: "0.8em", opacity: 0.7 }}>{t("footer.adminAccess")}</p>
      </div>
    </footer>
  );
};

export default FooterAdmin;