import Card from "./Card";
import "../assets/styles/SearchResults.css";
import { useNavigate } from "react-router-dom";
import empty_pokeball from "../assets/images/empty-pokeball.png"

export default function SearchResults(props) {
  const { pokemon, expandCard, darkMode } = props;
  const navigate = useNavigate();

  return (
    <main className={`search-page-container ${darkMode ? "dark-mode" : ""}`}>
      {pokemon !== null ? (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          sprites={pokemon.sprites}
          types={pokemon.types}
          height={pokemon.height}
          weight={pokemon.weight}
          expandCard={expandCard}
          darkMode={darkMode}
        />
      ) : (
        <div className={`error-message-container ${darkMode ? "dark-mode" : ""}`}>
          <h1>Oh no, a wild error appeared! Pokémon not found.</h1>
        </div>
      )}
      <button
        className={`back-button ${darkMode ? "dark-mode" : ""}`}
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </main>
  );
}
