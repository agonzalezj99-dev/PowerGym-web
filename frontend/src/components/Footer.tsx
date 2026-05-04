import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer>
      <p>© 2025 PowerGym. {t("footer.rights")}</p>
    </footer>
  );
};

export default Footer;
