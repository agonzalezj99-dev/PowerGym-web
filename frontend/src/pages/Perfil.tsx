import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import FooterAdmin from "../components/FooterAdmin";


interface Usuario {
  nombre: string;
  email: string;
  fecha_nacimiento: string;
  membresia: string;
  rol: string;
  fecha_registro: string;
}

const Perfil = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nombre: "", fecha_nacimiento: "", membresia: "", contrasena: "" });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setForm({
          nombre: data.nombre,
          fecha_nacimiento: data.fecha_nacimiento?.slice(0, 10) || "",
          membresia: data.membresia || "basica",
          contrasena: "",
        });
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/perfil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMensaje(data.error || "Error al actualizar");
      return;
    }

    localStorage.setItem("nombre", form.nombre);
    setUsuario({ ...usuario!, ...form });
    setEditando(false);
    setMensaje("Perfil actualizado correctamente");
    setTimeout(() => setMensaje(""), 3000);
  };

  if (!usuario) return <p style={{ textAlign: "center", padding: "40px" }}>Cargando...</p>;

  return (
    <>
      <Header subtitle="Tu perfil de PowerGym" />
      {usuario.rol === "admin" ? <NavbarAdmin /> : <Navbar />}
      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <div className="perfil-header">
            <div className="perfil-avatar">
              {usuario.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{usuario.nombre}</h2>
              <p>{usuario.email}</p>
              {usuario.rol !== "admin" && (
                <span className={`perfil-membresia perfil-membresia-${usuario.membresia}`}>
                  {usuario.membresia?.toUpperCase() || "BÁSICA"}
                </span>
              )}
            </div>
          </div>

          {mensaje && <p className="perfil-mensaje">{mensaje}</p>}

          {!editando ? (
            <div className="perfil-datos">
              <div className="perfil-dato">
                <span className="perfil-dato-label">Nombre</span>
                <span>{usuario.nombre}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-dato-label">Email</span>
                <span>{usuario.email}</span>
              </div>
              <div className="perfil-dato">
                <span className="perfil-dato-label">Fecha de nacimiento</span>
                <span>{usuario.fecha_nacimiento?.slice(0, 10)}</span>
              </div>
              {usuario.rol !== "admin" && (
                <div className="perfil-dato">
                  <span className="perfil-dato-label">Membresía</span>
                  <span>{usuario.membresia || "Básica"}</span>
                </div>
              )}
              <div className="perfil-dato">
                <span className="perfil-dato-label">Miembro desde</span>
                <span>{new Date(usuario.fecha_registro).toLocaleDateString()}</span>
              </div>
              <button className="btn" onClick={() => setEditando(true)}>Editar perfil</button>
            </div>
          ) : (
            <div className="perfil-form">
              <div className="form-group">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Fecha de nacimiento</label>
                <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
              </div>
              <div className="form-group">
                {usuario.rol !== "admin" && (
                  <div className="form-group">
                    <label>Membresía</label>
                    <select name="membresia" value={form.membresia} onChange={handleChange}>
                      <option value="basica">Básica - 29€/mes</option>
                      <option value="pro">Pro - 49€/mes</option>
                      <option value="premium">Premium - 79€/mes</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Nueva contraseña (dejar vacío para no cambiar)</label>
                <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} placeholder="••••••••" />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn" onClick={handleGuardar}>Guardar</button>
                <button className="btn" style={{ backgroundColor: "#95a5a6" }} onClick={() => setEditando(false)}>Cancelar</button>
              </div>
            </div>
          )}
        </section>
      </main>
      {usuario.rol === "admin" ? <FooterAdmin /> : <Footer />}
    </>
  );
};

export default Perfil;