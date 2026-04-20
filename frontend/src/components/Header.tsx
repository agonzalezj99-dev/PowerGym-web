import { useDarkMode } from "../context/DarkModeContext";

interface HeaderProps {
  subtitle: string;
}

const Header = ({ subtitle }: HeaderProps) => {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <header>
      <h1>PowerGym</h1>
      <p>{subtitle}</p>
      <button id="modoBoton" onClick={toggleDark} aria-label="Toggle dark mode">
        <span className="material-icons-outlined">
          {isDark ? "light_mode" : "dark_mode"}
        </span>
      </button>
    </header>
  );
};

export default Header;
