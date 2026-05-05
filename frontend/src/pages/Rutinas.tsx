import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const Rutinas = () => {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    objetivo: "perder peso",
    nivel: "principiante",
    dias: "3",
    restricciones: "",
  });

  const [rutina, setRutina] = useState("");
  const [cargando, setCargando] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  const handleGenerar = async () => {
    setCargando(true);
    setRutina("");

    try {
      const response = await fetch("http://localhost:3000/api/rutinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
    });

      const data = await response.json();
      setRutina(data.texto || "No se pudo generar la rutina");

    } catch (error) {
      console.error(error);
      setRutina("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Header subtitle={t("rutinas.subtitle")} />
      <Navbar />

      <main className="container">
        <section style={{ gridColumn: "1 / -1" }}>
          <h2>🤖 {t("rutinas.title")}</h2>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            {t("rutinas.description")}
          </p>

          <div className="rutinas-layout">

            {/* FORMULARIO */}
            <div className="rutinas-form">

              <div className="form-group">
                <label>{t("rutinas.label.objetivo")}</label>
                <select name="objetivo" value={form.objetivo} onChange={handleChange}>
                  <option value="perder peso">{t("rutinas.option.perderPeso")}</option>
                  <option value="ganar músculo">{t("rutinas.option.ganarMusculo")}</option>
                  <option value="mejorar resistencia">{t("rutinas.option.mejorarResistencia")}</option>
                  <option value="tonificar">{t("rutinas.option.tonificar")}</option>
                  <option value="mantenerse en forma">{t("rutinas.option.mantenerse")}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t("rutinas.label.nivel")}</label>
                <select name="nivel" value={form.nivel} onChange={handleChange}>
                  <option value="principiante">{t("rutinas.level.principiante")}</option>
                  <option value="intermedio">{t("rutinas.level.intermedio")}</option>
                  <option value="avanzado">{t("rutinas.level.avanzado")}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t("rutinas.label.dias")}</label>
                <select name="dias" value={form.dias} onChange={handleChange}>
                  <option value="2">{t("rutinas.days.2")}</option>
                  <option value="3">{t("rutinas.days.3")}</option>
                  <option value="4">{t("rutinas.days.4")}</option>
                  <option value="5">{t("rutinas.days.5")}</option>
                  <option value="6">{t("rutinas.days.6")}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t("rutinas.label.restricciones")}</label>
                <textarea
                  name="restricciones"
                  value={form.restricciones}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t("rutinas.placeholder.restricciones")}
                />
              </div>

              <button className="btn" onClick={handleGenerar} disabled={cargando}>
                {cargando ? t("rutinas.generating") : `🤖 ${t("rutinas.generate")}`}
              </button>

            </div>

            {/* RESULTADO */}
            <div className="rutinas-resultado">

              {cargando && (
                <div className="rutinas-cargando">
                  <div className="rutinas-spinner"></div>
                  <p>{t("rutinas.generating")}</p>
                </div>
              )}

              {rutina && !cargando && (
                <div className="rutinas-texto">
                  <h3>{t("rutinas.resultTitle")}</h3>
                  <pre>{rutina}</pre>
                </div>
              )}

              {!rutina && !cargando && (
                <div className="rutinas-vacio">
                  <span style={{ fontSize: "4em" }}>🏋️</span>
                  <p>{t("rutinas.empty")}</p>
                </div>
              )}

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Rutinas;