import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const services = [
  { titleKey: "inicio.service1.title", descriptionKey: "inicio.service1.description", emoji: "🧘" },
  { titleKey: "inicio.service2.title", descriptionKey: "inicio.service2.description", emoji: "🚴" },
  { titleKey: "inicio.service3.title", descriptionKey: "inicio.service3.description", emoji: "💃" },
] as const;

const planes = [
  { key: "inicio.basicPlan", nombreKey: "registro.basic", precioKey: "planes.basicPrice", color: "#2ecc71", featuresKeys: ["planes.basicFeature1", "planes.basicFeature2", "planes.basicFeature3"] },
  { key: "inicio.proPlan", nombreKey: "registro.pro", precioKey: "planes.proPrice", color: "#f39c12", featuresKeys: ["planes.proFeature1", "planes.proFeature2", "planes.proFeature3", "planes.proFeature4"] },
  { key: "inicio.premiumPlan", nombreKey: "registro.premium", precioKey: "planes.premiumPrice", color: "#2c3e50", featuresKeys: ["planes.premiumFeature1", "planes.premiumFeature2", "planes.premiumFeature3", "planes.premiumFeature4"] },
] as const;

const stats = [
  { numero: "500+", labelKey: "stats.members" },
  { numero: "10+", labelKey: "stats.instructors" },
  { numero: "20+", labelKey: "stats.classesPerWeek" },
  { numero: "15", labelKey: "stats.yearsExperience" },
];

const Inicio = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header subtitle={t("inicio.subtitle")} />
      <Navbar />
      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <h2>{t("inicio.welcomeTitle")}</h2>
            <p>{t("inicio.welcomeText")}</p>
            <div className="hero-buttons">
              <Link to="/registro" className="btn">{t("inicio.registerNow")}</Link>
              <Link to="/horarios" className="btn btn-outline">{t("nav.viewSchedule")}</Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.labelKey} className="stat-item">
                <span className="stat-numero">{s.numero}</span>
                <span className="stat-label">{t(s.labelKey)}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="container">

          {/* SERVICIOS */}
          <section id="servicios">
            <h2>{t("inicio.servicesTitle")}</h2>
            <div className="servicios-grid">
              {services.map((s) => (
                <article key={s.titleKey} className="servicio-card">
                  <span className="servicio-emoji">{s.emoji}</span>
                  <h3>{t(s.titleKey)}</h3>
                  <p>{t(s.descriptionKey)}</p>
                </article>
              ))}
            </div>
          </section>

          {/* TARIFAS */}
          <section id="tarifas">
            <h2>{t("inicio.pricesTitle")}</h2>
            <div className="planes-grid">
              {planes.map((p) => (
                <div key={p.key} className="plan-card" style={{ borderTop: `4px solid ${p.color}` }}>
                  <h3 style={{ color: p.color }}>{t(p.nombreKey)}</h3>
                  <p className="plan-precio">{t(p.precioKey)}</p>
                  <ul className="plan-features">
                    {p.featuresKeys.map((f) => (
                      <li key={f}>✓ {t(f)}</li>
                    ))}
                  </ul>
                  <Link to="/registro" className="btn" style={{ backgroundColor: p.color }}>{t("nav.choosePlan")}</Link>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Inicio;