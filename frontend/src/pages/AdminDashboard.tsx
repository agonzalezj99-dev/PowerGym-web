import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

interface Estadisticas {
  socios: number;
  inscripciones: number;
  clases: number;
  clasesPopulares: { nombre: string; inscritos: number }[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Estadisticas | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") navigate("/");

    fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/estadisticas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p style={{ textAlign: "center", padding: "40px" }}>Cargando...</p>;

  return (
    <>
      <Header subtitle="Panel de Administración" />
      <NavbarAdmin />
      <main className="container">
        <div style={{ gridColumn: "1 / -1" }}>

          <section>
            <h2>📊 Dashboard</h2>
            <div className="dashboard-grid">
              <div className="dashboard-card dashboard-card-azul">
                <span className="dashboard-emoji">👥</span>
                <span className="dashboard-numero">{stats.socios}</span>
                <span className="dashboard-label">Socios registrados</span>
              </div>
              <div className="dashboard-card dashboard-card-verde">
                <span className="dashboard-emoji">📋</span>
                <span className="dashboard-numero">{stats.inscripciones}</span>
                <span className="dashboard-label">Inscripciones totales</span>
              </div>
              <div className="dashboard-card dashboard-card-naranja">
                <span className="dashboard-emoji">🏋️</span>
                <span className="dashboard-numero">{stats.clases}</span>
                <span className="dashboard-label">Clases disponibles</span>
              </div>
            </div>
          </section>

          <section style={{ marginTop: "20px" }}>
            <h2>🏆 Clases más populares</h2>
            <div className="populares-lista">
              {stats.clasesPopulares.map((c, i) => (
                <div key={c.nombre} className="popular-item">
                  <div className="popular-posicion">#{i + 1}</div>
                  <div className="popular-info">
                    <span className="popular-nombre">{c.nombre}</span>
                    <div className="popular-barra-wrapper">
                      <div
                        className="popular-barra"
                        style={{ width: `${Math.min((Number(c.inscritos) / Number(stats.clasesPopulares[0].inscritos)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="popular-inscritos">{c.inscritos} inscritos</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <FooterAdmin />
    </>
  );
};

export default AdminDashboard;