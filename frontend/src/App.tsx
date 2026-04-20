import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import Inicio from "./pages/Inicio";
import Horarios from "./pages/Horarios";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import "./index.css";

const AppContent = () => {
  const { isDark } = useDarkMode();
  return (
    <div className={isDark ? "oscuro" : ""}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  </BrowserRouter>
);

export default App;
