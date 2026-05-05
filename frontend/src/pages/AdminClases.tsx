import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

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

const NOMBRES_CLASES = ["Yoga", "Spinning", "Zumba", "Pilates", "CrossFit", "Body Pump"];
const INSTRUCTORES = ["Laura Sánchez", "Carlos Mena", "Ana Torres", "Pedro Ruiz", "María López"];

const Admin = () => {
  const [clases, setClases] = useState<Clase[]>([]);
  const [form, setForm] = useState({
    nombre: NOMBRES_CLASES[0],
    instructor: INSTRUCTORES[0],
    dia_semana: "lunes",
    hora_inicio: "",
    hora_fin: "",
    plazas_max: 20
  });
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") navigate("/");

    fetch(`${import.meta.env.VITE_API_URL}/api/clases`)
      .then((res) => res.json())
      .then((data) => setClases(data));
  }, []);

  const getHorarios = (nombre: string, dia: string) => {
    return clases.filter((c) => c.nombre === nombre && c.dia_semana === dia);
  };

  const nombresUnicos = [...new Set(clases.map((c) => c.nombre))];

  const handleBorrar = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/api/clases/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setClases(clases.filter((c) => c.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAñadir = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const nuevasClases = await fetch(`${import.meta.env.VITE_API_URL}/api/clases`)
        .then((r) => r.json());
      setClases(nuevasClases);
      setForm({
        nombre: NOMBRES_CLASES[0],
        instructor: INSTRUCTORES[0],
        dia_semana: "lunes",
        hora_inicio: "",
        hora_fin: "",
        plazas_max: 20
      });
      alert("Clase añadida correctamente");
    }
  };

  return (
    <>
      <Header subtitle="Panel de Administración" />
      <NavbarAdmin />
      <main className="container">
        <div style={{ gridColumn: "1 / -1" }}>
          <section id="clases">
            <h2>🏋️ Gestión de Clases</h2>
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
                    {diasSemana.map((dia) => {
                      const horarios = getHorarios(nombre, dia);
                      return (
                        <td key={dia}>
                          {horarios.length === 0 ? "-" : horarios.map((h) => (
                            <div key={h.id}>
                              {h.hora_inicio.slice(0, 5)}-{h.hora_fin.slice(0, 5)}
                              <button
                                onClick={() => handleBorrar(h.id)}
                                className="btn-borrar"
                              >
                                Borrar clase
                              </button>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="añadir-clase" style={{ marginTop: "20px" }}>
            <h2>➕ Añadir Clase</h2>
            <div>
              <div className="form-group">
                <label>Nombre</label>
                <select name="nombre" value={form.nombre} onChange={handleChange}>
                  {NOMBRES_CLASES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Instructor</label>
                <select name="instructor" value={form.instructor} onChange={handleChange}>
                  {INSTRUCTORES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Día</label>
                <select name="dia_semana" value={form.dia_semana} onChange={handleChange}>
                  {["lunes","martes","miercoles","jueves","viernes","sabado"].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Hora inicio</label>
                <input type="time" name="hora_inicio" value={form.hora_inicio} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Hora fin</label>
                <input type="time" name="hora_fin" value={form.hora_fin} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Plazas máximas</label>
                <input type="number" name="plazas_max" value={form.plazas_max} onChange={handleChange} />
              </div>
              <button className="btn" onClick={handleAñadir}>Añadir Clase</button>
            </div>
          </section>
        </div>
      </main>
      <FooterAdmin />
    </>
  );
};

export default Admin;