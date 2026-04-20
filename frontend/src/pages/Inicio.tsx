import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const servicios = [
  {
    titulo: "Musculación",
    descripcion: "Acceso ilimitado a nuestra sala de pesas y máquinas de última generación.",
  },
  {
    titulo: "Clases Dirigidas",
    descripcion: "Zumba, Yoga, Spinning, y más. ¡Consulta el horario completo!",
  },
  {
    titulo: "Entrenamiento Personal",
    descripcion: "Programas personalizados con nuestros entrenadores certificados.",
  },
];

const Inicio = () => {
  return (
    <>
      <Header subtitle="Tu mejor versión comienza aquí" />
      <Navbar />
      <main className="container">
        <section id="inicio">
          <h2>⭐ ¡Bienvenido a PowerGym!</h2>
          <p>Somos tu centro fitness de confianza. ¡Te esperamos!</p>
          <br />
          <Link to="/registro" className="btn">¡Regístrate Ahora!</Link>
        </section>

        <section id="servicios">
          <h2>💪 Nuestros Servicios</h2>
          {servicios.map((s) => (
            <article key={s.titulo} className="servicio">
              <h3>{s.titulo}</h3>
              <p>{s.descripcion}</p>
            </article>
          ))}
        </section>

        <section id="tarifas">
          <h2>💰 Tarifas de Membresía</h2>
          <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
            <p>Plan Básico: 30€/mes. Acceso a sala.</p>
            <p>Plan Pro: 50€/mes. Acceso a sala + 4 clases/mes.</p>
            <p>Plan Premium: 70€/mes. Acceso total.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Inicio;
