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
  const [editando, setEditando] = useState<Clase | null>(null);
  const [formEditar, setFormEditar] = useState({
    nombre: "",
    instructor: "",
    dia_semana: "",
    hora_inicio: "",
    hora_fin: "",
    plazas_max: 20
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    await fetch(`${import.meta.env.VITE_API_URL}/api/clases/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setClases(clases.filter((c) => c.id !== id));
  };

  const handleEditar = (clase: Clase) => {
    setEditando(clase);
    setFormEditar({
      nombre: clase.nombre,
      instructor: clase.instructor,
      dia_semana: clase.dia_semana,
      hora_inicio: clase.hora_inicio.slice(0, 5),
      hora_fin: clase.hora_fin.slice(0, 5),
      plazas_max: clase.plazas_max
    });
  };

  const handleGuardarEdicion = async () => {
    if (!editando) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clases/${editando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formEditar),
    });
    if (res.ok) {
      const nuevasClases = await fetch(`${import.meta.env.VITE_API_URL}/api/clases`)
        .then((r) => r.json());
      setClases(nuevasClases);
      setEditando(null);
      alert("Clase actualizada correctamente");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeEditar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormEditar({ ...formEditar, [e.target.name]: e.target.value });
  };

  const handleAñadir = async () => {
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
      setForm({ nombre: NOMBRES_CLASES[0], instructor: INSTRUCTORES[0], dia_semana: "lunes", hora_inicio: "", hora_fin: "", plazas_max: 20 });
      alert("Clase añadida correctamente");
    }
  };

  return (
    <>
      <Header subtitle="Panel de Administración" hideLanguage />
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
                                onClick={() => handleEditar(h)}
                                className="btn-inscribirse"
                                style={{ marginBottom: "4px" }}
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleBorrar(h.id)}
                                className="btn-borrar"
                              >
                                Borrar
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

          {editando && (
            <section id="editar-clase" style={{ marginTop: "20px" }}>
              <h2>✏️ Editar Clase: {editando.nombre}</h2>
              <div>
                <div className="form-group">
                  <label>Nombre</label>
                  <select name="nombre" value={formEditar.nombre} onChange={handleChangeEditar}>
                    {NOMBRES_CLASES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Instructor</label>
                  <select name="instructor" value={formEditar.instructor} onChange={handleChangeEditar}>
                    {INSTRUCTORES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Día</label>
                  <select name="dia_semana" value={formEditar.dia_semana} onChange={handleChangeEditar}>
                    {["lunes","martes","miercoles","jueves","viernes","sabado"].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Hora inicio</label>
                  <input type="time" name="hora_inicio" value={formEditar.hora_inicio} onChange={handleChangeEditar} />
                </div>
                <div className="form-group">
                  <label>Hora fin</label>
                  <input type="time" name="hora_fin" value={formEditar.hora_fin} onChange={handleChangeEditar} />
                </div>
                <div className="form-group">
                  <label>Plazas máximas</label>
                  <input type="number" name="plazas_max" value={formEditar.plazas_max} onChange={handleChangeEditar} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn" onClick={handleGuardarEdicion}>Guardar cambios</button>
                  <button className="btn" style={{ backgroundColor: "#95a5a6" }} onClick={() => setEditando(null)}>Cancelar</button>
                </div>
              </div>
            </section>
          )}

          <section id="añadir-clase" style={{ marginTop: "20px" }}>
            <h2>➕ Añadir Clase</h2>
            <div>
              <div className="form-group">
                <label>Nombre</label>
                <select name="nombre" value={form.nombre} onChange={handleChange}>
                  {NOMBRES_CLASES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Instructor</label>
                <select name="instructor" value={form.instructor} onChange={handleChange}>
                  {INSTRUCTORES.map((i) => <option key={i} value={i}>{i}</option>)}
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