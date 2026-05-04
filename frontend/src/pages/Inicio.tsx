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
  { key: "inicio.basicPlan", nombre: "Básica", precio: "29€/mes", color: "#2ecc71", features: ["Acceso sala fitness", "Vestuarios", "1 clase dirigida/semana"] },
  { key: "inicio.proPlan", nombre: "Pro", precio: "49€/mes", color: "#f39c12", features: ["Acceso sala fitness", "Vestuarios", "Clases ilimitadas", "Zona spa"] },
  { key: "inicio.premiumPlan", nombre: "Premium", precio: "79€/mes", color: "#2c3e50", features: ["Todo lo de Pro", "Entrenador personal", "Nutricionista", "Acceso 24h"] },
] as const;

const stats = [
  { numero: "500+", label: "Socios" },
  { numero: "10+", label: "Monitores" },
  { numero: "20+", label: "Clases/semana" },
  { numero: "15", label: "Años de experiencia" },
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
              <Link to="/horarios" className="btn btn-outline">Ver horarios</Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-numero">{s.numero}</span>
                <span className="stat-label">{s.label}</span>
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
                  <h3 style={{ color: p.color }}>{p.nombre}</h3>
                  <p className="plan-precio">{p.precio}</p>
                  <ul className="plan-features">
                    {p.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                  <Link to="/registro" className="btn" style={{ backgroundColor: p.color }}>Elegir plan</Link>
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