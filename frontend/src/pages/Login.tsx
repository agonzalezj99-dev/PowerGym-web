import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", contrasena: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

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
        setError(data.error || t("login.loginError"));
        return;
      }

      // Guarda el token y el rol
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("nombre", data.nombre);

      // Redirige según el rol
      if (data.rol === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(t("login.serverError"));
    }
  };

  return (
    <>
      <Header subtitle={t("login.subtitle")} />
      <Navbar />
      <main className="container">
        <section id="login-form" style={{ gridColumn: "1 / -1", maxWidth: "400px", margin: "0 auto" }}>
          <h2>{t("login.title")}</h2>
          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
          <div>
            <div className="form-group">
              <label htmlFor="email">{t("login.email")}</label>
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
              <label htmlFor="contrasena">{t("login.password")}</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={form.contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn" onClick={handleSubmit}>{t("login.submit")}</button>
            <p style={{ marginTop: "15px" }}>
              {t("login.noAccount")} <a href="/registro">{t("login.register")}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;