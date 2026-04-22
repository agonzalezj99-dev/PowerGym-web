import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Membresia = "basica" | "pro" | "premium" | "";

interface FormData {
  nombre: string;
  email: string;
  contrasena: string;
  fechaNacimiento: string;
  membresia: Membresia;
}

const Registro = () => {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    contrasena: "",
    fechaNacimiento: "",
    membresia: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          contrasena: form.contrasena,
          fecha_nacimiento: form.fechaNacimiento,
          membresia: form.membresia,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al registrarse");
        return;
      }

      alert("¡Cuenta creada con éxito!");
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <Header subtitle="Comienza tu camino hacia una vida más saludable" />
      <Navbar />
      <main className="container">
        <section id="registro-form" style={{ gridColumn: "1 / -1" }}>
          <h2>📝 Registro de Usuario</h2>
          <div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input type="password" id="contrasena" name="contrasena" value={form.contrasena} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Tipo de Membresía</label>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                {(["basica", "pro", "premium"] as const).map((m) => (
                  <label key={m}>
                    <input
                      type="radio"
                      name="membresia"
                      value={m}
                      checked={form.membresia === m}
                      onChange={handleChange}
                    />{" "}
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>Crear Cuenta</button>
            <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesion aquí</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Registro;