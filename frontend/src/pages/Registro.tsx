import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Membresia = "basica" | "pro" | "premium" | "";

interface FormData {
  nombre: string;
  email: string;
  fechaNacimiento: string;
  membresia: Membresia;
}

const Registro = () => {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    fechaNacimiento: "",
    membresia: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registro enviado:", form);
    alert("¡Cuenta creada con éxito!");
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Registro;
