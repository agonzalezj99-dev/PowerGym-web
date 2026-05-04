import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

interface Clase {
  id: number;
  nombre: string;
  instructor: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  plazas_max: number;
}

const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes"] as const;
const dayKeyMap = {
  lunes: "horarios.monday",
  martes: "horarios.tuesday",
  miercoles: "horarios.wednesday",
  jueves: "horarios.thursday",
  viernes: "horarios.friday",
} as const;

const Horarios = () => {
  const [clases, setClases] = useState<Clase[]>([]);
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const { t } = useLanguage();
  const diasLabel = diasSemana.map((dia) => t(dayKeyMap[dia]));

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/clases`)
      .then((res) => res.json())
      .then((data) => setClases(data));
  }, []);

  const getHorarios = (nombre: string, dia: string) => {
    return clases.filter((c) => c.nombre === nombre && c.dia_semana === dia);
  };

  const nombresUnicos = [...new Set(clases.map((c) => c.nombre))];

  const handleInscribirse = async (clase_id: number) => {
    if (!token) {
      alert(t("horarios.loginRequired"));
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/inscripciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ clase_id }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || t("horarios.joinError"));
      return;
    }
    alert(t("horarios.joinSuccess"));
  };

  return (
    <>
      <Header subtitle={t("horarios.subtitle")} />
      <Navbar />
      <main className="container">
        <div style={{ gridColumn: "1 / -1" }}>
          <section id="clases">
            <h2>{t("horarios.classesTitle")}</h2>
            <div className="tabla-wrapper">
              <table className="tabla-horarios">
                <thead>
                  <tr>
                    <th>{t("horarios.classCol")}</th>
                    {diasLabel.map((diaLabel) => (
                      <th key={diaLabel}>{diaLabel}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nombresUnicos.map((nombre, i) => (
                    <tr key={nombre} className={i % 2 === 0 ? "fila-par" : "fila-impar"}>
                      <td className="celda-clase"><strong>{nombre}</strong></td>
                      {diasSemana.map((dia) => {
                        const horarios = getHorarios(nombre, dia);
                        return (
                          <td key={dia} className="celda-horario">
                            {horarios.length === 0 ? (
                              <span className="sin-clase">—</span>
                            ) : horarios.map((h) => (
                              <div key={h.id} className="horario-item">
                                <span className="horario-hora">
                                  {h.hora_inicio.slice(0, 5)}-{h.hora_fin.slice(0, 5)}
                                </span>
                                {token && rol !== "admin" && (
                                  <button
                                    onClick={() => handleInscribirse(h.id)}
                                    className="btn-inscribirse"
                                    title={t("horarios.joinTooltip")}
                                  >
                                    {t("horarios.joinClass")}
                                  </button>
                                )}
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="apertura" className="apertura-section">
            <h2>{t("horarios.openingTitle")}</h2>
            <div className="apertura-grid">
              <div className="apertura-item">
                <span className="apertura-emoji">📅</span>
                <p>{t("horarios.openWeek")}</p>
              </div>
              <div className="apertura-item">
                <span className="apertura-emoji">📅</span>
                <p>{t("horarios.openSat")}</p>
              </div>
              <div className="apertura-item">
                <span className="apertura-emoji">🚫</span>
                <p>{t("horarios.openSun")}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Horarios;