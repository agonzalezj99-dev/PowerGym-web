import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

interface Inscripcion {
  id: number;
  usuario_nombre: string;
  usuario_email: string;
  clase_nombre: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  fecha: string;
}

const AdminInscripciones = () => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") navigate("/");

    fetch(`${import.meta.env.VITE_API_URL}/api/inscripciones/todas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setInscripciones(data));
  }, []);

  return (
    <>
      <Header subtitle="Panel de Administración" />
      <NavbarAdmin />
      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <h2>📋 Inscripciones de Socios</h2>
          {inscripciones.length === 0 ? (
            <p>No hay inscripciones activas.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Socio</th>
                  <th>Email</th>
                  <th>Clase</th>
                  <th>Día</th>
                  <th>Horario</th>
                  <th>Fecha inscripción</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((i) => (
                  <tr key={i.id}>
                    <td>{i.usuario_nombre}</td>
                    <td>{i.usuario_email}</td>
                    <td>{i.clase_nombre}</td>
                    <td>{i.dia_semana}</td>
                    <td>{i.hora_inicio.slice(0, 5)}-{i.hora_fin.slice(0, 5)}</td>
                    <td>{new Date(i.fecha).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
      <FooterAdmin />
    </>
  );
};

export default AdminInscripciones;