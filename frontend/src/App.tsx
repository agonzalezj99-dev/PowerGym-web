import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Inicio from "./pages/Inicio";
import Horarios from "./pages/Horarios";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import Inscripciones from "./pages/Inscripciones";
import AdminClases from "./pages/AdminClases";
import AdminInscripciones from "./pages/AdminInscripciones";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import "./index.css";
import Notificaciones from "./pages/Notificaciones";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminConsultas from "./pages/AdminConsultas";
import Rutinas from "./pages/Rutinas";

const AppContent = () => {
  const { isDark } = useDarkMode();
  return (
    <div className={isDark ? "oscuro" : ""}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inscripciones" element={<Inscripciones />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/admin" element={<AdminClases />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/inscripciones" element={<AdminInscripciones />} />
        <Route path="/admin/consultas" element={<AdminConsultas />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <DarkModeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DarkModeProvider>
  </BrowserRouter>
);

export default App;
