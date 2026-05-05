import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fecha_nacimiento: string;
  membresia: string;
  fecha_registro: string;
}

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [membresia, setMembresia] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") navigate("/");

    fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const handleEditar = (u: Usuario) => {
    setEditando(u.id);
    setMembresia(u.membresia || "basica");
  };

  const handleGuardar = async (id: number) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ membresia }),
    });

    if (res.ok) {
      setUsuarios(usuarios.map((u) =>
        u.id === id ? { ...u, membresia } : u
      ));
      setEditando(null);
      alert("Membresía actualizada correctamente");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
      alert("Usuario dado de baja correctamente");
    }
  };

  return (
    <>
      <Header subtitle="Panel de Administración" />
      <NavbarAdmin />
      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <h2>👥 Gestión de Usuarios</h2>
          {usuarios.length === 0 ? (
            <p>No hay socios registrados.</p>
          ) : (
            <div className="usuarios-grid">
              {usuarios.map((u) => (
                <div key={u.id} className="usuario-card">
                  <div className="usuario-avatar">
                    {u.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="usuario-info">
                    <h3>{u.nombre}</h3>
                    <p>✉️ {u.email}</p>
                    <p>🎂 {u.fecha_nacimiento?.slice(0, 10)}</p>
                    <p>📅 Miembro desde {new Date(u.fecha_registro).toLocaleDateString()}</p>
                    {editando === u.id ? (
                      <div className="usuario-editar">
                        <select
                          value={membresia}
                          onChange={(e) => setMembresia(e.target.value)}
                        >
                          <option value="basica">Básica - 29€/mes</option>
                          <option value="pro">Pro - 49€/mes</option>
                          <option value="premium">Premium - 79€/mes</option>
                        </select>
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                          <button className="btn" onClick={() => handleGuardar(u.id)}>Guardar</button>
                          <button className="btn" style={{ backgroundColor: "#95a5a6" }} onClick={() => setEditando(null)}>Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <span className={`perfil-membresia perfil-membresia-${u.membresia}`}>
                        {u.membresia?.toUpperCase() || "BÁSICA"}
                      </span>
                    )}
                  </div>
                  <div className="usuario-acciones">
                    <button className="btn" onClick={() => handleEditar(u)}>✏️ Membresía</button>
                    <button className="btn-borrar" onClick={() => handleEliminar(u.id)}>🗑️ Dar de baja</button>
                  </div>
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

export default AdminUsuarios;