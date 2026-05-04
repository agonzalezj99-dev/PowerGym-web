import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();

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
        alert(data.error || t("register.registerError"));
        return;
      }

      alert(t("register.registerSuccess"));
    } catch (error) {
      console.error(error);
      alert(t("register.serverError"));
    }
  };

  return (
    <>
      <Header subtitle={t("register.subtitle")} />
      <Navbar />
      <main className="container">
        <section id="registro-form" style={{ gridColumn: "1 / -1" }}>
          <h2>{t("register.title")}</h2>
          <div>
            <div className="form-group">
              <label htmlFor="nombre">{t("register.name")}</label>
              <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t("register.email")}</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contrasena">{t("register.password")}</label>
              <input type="password" id="contrasena" name="contrasena" value={form.contrasena} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fechaNacimiento">{t("register.birthDate")}</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t("register.membershipType")}</label>
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
                    {m === "basica" ? t("register.basic") : m === "pro" ? t("register.pro") : t("register.premium")}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>{t("register.create")}</button>
            <p>{t("register.hasAccount")} <a href="/login">{t("register.login")}</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Registro;