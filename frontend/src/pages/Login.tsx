import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [form, setForm] = useState({ email: "", contrasena: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      // Guarda el token y el rol
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      // Redirige según el rol
      if (data.rol === "admin") {
        navigate("/adminClases");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <Header subtitle="Bienvenido de nuevo a PowerGym" />
      <Navbar />
      <main className="container">
        <section id="login-form" style={{ gridColumn: "1 / -1", maxWidth: "400px", margin: "0 auto" }}>
          <h2>🔐 Iniciar Sesión</h2>
          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
          <div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={form.contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn" onClick={handleSubmit}>Iniciar Sesión</button>
            <p style={{ marginTop: "15px" }}>
              ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;