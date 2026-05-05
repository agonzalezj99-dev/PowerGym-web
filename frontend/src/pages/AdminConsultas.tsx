import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

interface Consulta {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha: string;
}

const AdminConsultas = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") navigate("/");

    fetch(`${import.meta.env.VITE_API_URL}/api/contacto`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setConsultas(data));
  }, []);

  return (
    <>
      <Header subtitle="Panel de Administración" />
      <NavbarAdmin />
      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <h2>✉️ Consultas recibidas</h2>
          {consultas.length === 0 ? (
            <p>No hay consultas recibidas.</p>
          ) : (
            <div className="consultas-lista">
              {consultas.map((c) => (
                <div key={c.id} className="consulta-card" id={`consulta-${c.id}`}>
                  <div className="consulta-header">
                    <div>
                      <h3>{c.nombre}</h3>
                      <p>✉️ {c.email}</p>
                    </div>
                    <span className="consulta-fecha">
                      {new Date(c.fecha).toLocaleDateString()} {new Date(c.fecha).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="consulta-mensaje">{c.mensaje}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <FooterAdmin />
    </>
  );
};

export default AdminConsultas;