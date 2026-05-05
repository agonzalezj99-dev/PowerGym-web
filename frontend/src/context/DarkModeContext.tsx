import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggleDark: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggleDark: () => {},
});

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    // Cargar modo oscuro guardado del localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      return JSON.parse(savedDarkMode);
    }
    // Usar preferencia del sistema si disponible
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDark = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newValue));
      return newValue;
    });
  };

  // Aplicar el modo oscuro al documento
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("oscuro");
    } else {
      document.body.classList.remove("oscuro");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);