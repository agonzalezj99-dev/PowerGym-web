import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface ContactForm {
  nombre: string;
  email: string;
  mensaje: string;
}

const Contacto = () => {
  const [form, setForm] = useState<ContactForm>({ nombre: "", email: "", mensaje: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consulta enviada:", form);
    alert("¡Consulta enviada con éxito!");
  };

  return (
    <>
      <Header subtitle="Estamos aquí para ayudarte. Contacta con nosotros." />
      <Navbar />
      <main className="container">
        <section id="ubicacion">
          <h2>📍 Encuéntranos</h2>
          <p><strong>Dirección:</strong> Calle Pintores, N° 15, 10003, Cáceres.</p>
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
          <h3>📞 Información Directa</h3>
          <p><strong>Teléfono:</strong> 927 555 12 34</p>
          <p><strong>Email:</strong> info@powergym.com</p>
        </aside>

        <section id="formulario">
          <h2>✉️ Formulario de Consulta</h2>
          <div>
            <div className="form-group">
              <label htmlFor="nombre_c">Tu Nombre</label>
              <input type="text" id="nombre_c" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email_c">Correo Electrónico</label>
              <input type="email" id="email_c" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={5} value={form.mensaje} onChange={handleChange} />
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>Enviar Consulta</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacto;
