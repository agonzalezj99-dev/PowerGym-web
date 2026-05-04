import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const services = [
  { titleKey: "inicio.service1.title", descriptionKey: "inicio.service1.description" },
  { titleKey: "inicio.service2.title", descriptionKey: "inicio.service2.description" },
  { titleKey: "inicio.service3.title", descriptionKey: "inicio.service3.description" },
] as const;

const Inicio = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header subtitle={t("inicio.subtitle")} />
      <Navbar />
      <main className="container">
        <section id="inicio">
          <h2>{t("inicio.welcomeTitle")}</h2>
          <p>{t("inicio.welcomeText")}</p>
          <br />
          <Link to="/registro" className="btn">{t("inicio.registerNow")}</Link>
        </section>

        <section id="servicios">
          <h2>{t("inicio.servicesTitle")}</h2>
          {services.map((s) => (
            <article key={s.titleKey} className="servicio">
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.descriptionKey)}</p>
            </article>
          ))}
        </section>

        <section id="tarifas">
          <h2>{t("inicio.pricesTitle")}</h2>
          <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
            <p>{t("inicio.basicPlan")}</p>
            <p>{t("inicio.proPlan")}</p>
            <p>{t("inicio.premiumPlan")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Inicio;
