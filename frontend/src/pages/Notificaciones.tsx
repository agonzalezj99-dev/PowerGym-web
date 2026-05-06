import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import FooterAdmin from "../components/FooterAdmin";

interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  leida: boolean;
  fecha: string;
}

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetch(`${import.meta.env.VITE_API_URL}/api/notificaciones`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificaciones(Array.isArray(data) ? data : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const marcarLeida = async (id: number, mensaje: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notificaciones/${id}/leer`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotificaciones(notificaciones.map((n) =>
      n.id === id ? { ...n, leida: true } : n
    ));
    const partes = mensaje.split("|");
    if (partes[1]) navigate(partes[1]);
  };

  const marcarTodas = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notificaciones/leer-todas`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotificaciones(notificaciones.map((n) => ({ ...n, leida: true })));
  };

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  if (cargando) return <p style={{ textAlign: "center", padding: "40px" }}>Cargando...</p>;

  return (
    <>
      <Header subtitle="Tus notificaciones" hideLanguage={rol === "admin"} />
      {rol === "admin" ? <NavbarAdmin /> : <Navbar />}
      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <div className="notif-header">
            <h2>
              🔔 Notificaciones
              {noLeidas > 0 && <span className="notif-badge">{noLeidas}</span>}
            </h2>
            {noLeidas > 0 && (
              <button className="btn" onClick={marcarTodas}>
                Marcar todas como leídas
              </button>
            )}
          </div>

          {notificaciones.length === 0 ? (
            <div className="notif-empty">
              <span style={{ fontSize: "3em" }}>🔔</span>
              <p>No tienes notificaciones</p>
            </div>
          ) : (
            <div className="notif-lista">
              {notificaciones.map((n) => {
                const partes = n.mensaje.split("|");
                const textoMensaje = partes[0];
                const enlace = partes[1];

                return (
                  <div
                    key={n.id}
                    className={`notif-item ${!n.leida ? "notif-no-leida" : ""} ${enlace ? "notif-clickable" : ""}`}
                    onClick={() => enlace && marcarLeida(n.id, n.mensaje)}
                  >
                    <div className="notif-content">
                      <h3>{n.titulo}</h3>
                      <p>
                        {textoMensaje}
                        {enlace && <span className="notif-ver"> Ver →</span>}
                      </p>
                      <span className="notif-fecha">
                        {new Date(n.fecha).toLocaleDateString()}{" "}
                        {new Date(n.fecha).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {!n.leida && !enlace && (
                      <button
                        className="btn-notif-leer"
                        onClick={(e) => { e.stopPropagation(); marcarLeida(n.id, n.mensaje); }}
                      >
                        ✓ Leída
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      {rol === "admin" ? <FooterAdmin /> : <Footer />}
    </>
  );
};

export default Notificaciones;