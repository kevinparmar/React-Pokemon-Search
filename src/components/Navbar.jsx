import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";

export default function Navbar(props) {
  const { darkMode } = props;

  return (
    <header>
      <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
        <Link to="/" className={`navbar-link ${darkMode ? "dark-mode" : ""}`}>
          <img
            className="navbar-logo"
            src={`src/assets/images/pokeball-${
              darkMode ? "white" : "black"
            }.png`}
            alt="pokemon app logo"
          ></img>
        </Link>
        <h1 className={`navbar-title ${darkMode ? "dark-mode" : ""}`}>
          POKÉMON APP
        </h1>
        <div className={`toggler ${darkMode ? "dark-mode" : ""}`}>
          <p className={`toggle-light ${darkMode ? "dark-mode" : ""}`}>Light</p>
          <div
            className={`toggle-container ${darkMode ? "dark-mode" : ""}`}
            onClick={props.toggleDarkMode}
          >
            <div
              className={`toggle-slider ${darkMode ? "dark-mode" : ""}`}
            ></div>
          </div>
          <p className={`toggle-dark ${darkMode ? "dark-mode" : ""}`}>Dark</p>
        </div>
      </nav>
    </header>
  );
}
