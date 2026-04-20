import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const clases = [
  { nombre: "Yoga",     lunes: "9:00-10:00", martes: "-",          miercoles: "9:00-10:00", jueves: "-",          viernes: "9:00-10:00" },
  { nombre: "Spinning", lunes: "18:30-19:30", martes: "18:30-19:30", miercoles: "-",         jueves: "18:30-19:30", viernes: "18:30-19:30" },
  { nombre: "Zumba",    lunes: "-",          martes: "19:30-20:30", miercoles: "-",         jueves: "19:30-20:30", viernes: "-" },
];

const Horarios = () => {
  return (
    <>
      <Header subtitle="Consulta todos nuestros horarios de apertura y clases" />
      <Navbar />
      <main className="container">
        <div style={{ gridColumn: "1 / -1" }}>
          <section id="clases">
            <h2>🏋️ Horario de Clases Dirigidas</h2>
            <table>
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                {clases.map((c) => (
                  <tr key={c.nombre}>
                    <td><strong>{c.nombre}</strong></td>
                    <td>{c.lunes}</td>
                    <td>{c.martes}</td>
                    <td>{c.miercoles}</td>
                    <td>{c.jueves}</td>
                    <td>{c.viernes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="apertura">
            <h2>⏰ Horario de Apertura</h2>
            <ul>
              <li><strong>Lunes a Viernes:</strong> 6:00 a.m. - 23:00 p.m.</li>
              <li><strong>Sábados:</strong> 8:00 a.m. - 20:00 p.m.</li>
              <li><strong>Domingos y Festivos:</strong> Cerrado</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Horarios;
