import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Inscripcion {
  id: number;
  nombre: string;
  instructor: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
}

const MisInscripciones = () => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/inscripciones`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setInscripciones(data));
  }, []);

  const handleCancelar = async (id: number) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/inscripciones/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setInscripciones(inscripciones.filter((i) => i.id !== id));
      alert("Inscripción cancelada correctamente");
    }
  };

  return (
    <>
      <Header subtitle="Gestiona tus clases inscritas" />
      <Navbar />
      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <h2>📋 Mis Inscripciones</h2>
          {inscripciones.length === 0 ? (
            <p>No tienes ninguna inscripción activa.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Instructor</th>
                  <th>Día</th>
                  <th>Horario</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((i) => (
                  <tr key={i.id}>
                    <td><strong>{i.nombre}</strong></td>
                    <td>{i.instructor}</td>
                    <td>{i.dia_semana}</td>
                    <td>{i.hora_inicio.slice(0, 5)}-{i.hora_fin.slice(0, 5)}</td>
                    <td>
                      <button
                        onClick={() => handleCancelar(i.id)}
                        style={{ background: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", padding: "4px 10px" }}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MisInscripciones;