import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

interface ContactForm {
  nombre: string;
  email: string;
  mensaje: string;
}

const Contacto = () => {
  const [form, setForm] = useState<ContactForm>({ nombre: "", email: "", mensaje: "" });
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || t("contact.sendError"));
        return;
      }

      alert(t("contact.sendSuccess"));
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch (error) {
      console.error(error);
      alert(t("contact.serverError"));
    }
  };

  return (
    <>
      <Header subtitle={t("contact.subtitle")} />
      <Navbar />
      <main className="container">
        <section id="ubicacion">
          <h2>{t("contact.findUs")}</h2>
          <p><strong>{t("contact.addressLabel")}</strong> {t("contact.addressText")}</p>
          <div style={{ marginTop: "15px", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.4567!2d-6.3723!3d39.4739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd15df0000000000%3A0x0!2zMznCsDI4JzI2LjAiTiA2wrAyMicyMC4zIlc!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Mapa PowerGym"
            />
          </div>
        </section>

        <aside>
          <h3>{t("contact.directInfo")}</h3>
          <p><strong>{t("contact.phone")}</strong> 927 555 12 34</p>
          <p><strong>Email:</strong> info@powergym.com</p>
        </aside>

        <section id="formulario">
          <h2>{t("contact.formTitle")}</h2>
          <div>
            <div className="form-group">
              <label htmlFor="nombre_c">{t("contact.name")}</label>
              <input type="text" id="nombre_c" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email_c">{t("contact.email")}</label>
              <input type="email" id="email_c" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">{t("contact.message")}</label>
              <textarea id="mensaje" name="mensaje" rows={5} value={form.mensaje} onChange={handleChange} />
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>{t("contact.submit")}</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacto;