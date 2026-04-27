import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Clase {
  id: number;
  nombre: string;
  instructor: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  plazas_max: number;
}

const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes"];

const Horarios = () => {
  const [clases, setClases] = useState<Clase[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/clases`)
      .then((res) => res.json())
      .then((data) => setClases(data));
  }, []);

  const getHorario = (nombre: string, dia: string) => {
    const clase = clases.find(
      (c) => c.nombre === nombre && c.dia_semana === dia
    );
    if (!clase) return "-";
    return `${clase.hora_inicio.slice(0, 5)}-${clase.hora_fin.slice(0, 5)}`;
  };

  const nombresUnicos = [...new Set(clases.map((c) => c.nombre))];

  return (
    <>
      <Header subtitle="Consulta todos nuestros horarios de apertura y clases" />
      <Navbar />
      <main className="container">
        <div style={{ gridColumn: "1 / -1" }}>
          <section id="clases">
            <h2>🏋️ Horario de Clases Dirigidas</h2>
            <table>
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                {nombresUnicos.map((nombre) => (
                  <tr key={nombre}>
                    <td><strong>{nombre}</strong></td>
                    {diasSemana.map((dia) => (
                      <td key={dia}>{getHorario(nombre, dia)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="apertura">
            <h2>⏰ Horario de Apertura</h2>
            <ul>
              <li><strong>Lunes a Viernes:</strong> 6:00 a.m. - 23:00 p.m.</li>
              <li><strong>Sábados:</strong> 8:00 a.m. - 20:00 p.m.</li>
              <li><strong>Domingos y Festivos:</strong> Cerrado</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Horarios;