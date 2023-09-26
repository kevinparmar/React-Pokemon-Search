import Card from "./Card";
import "../assets/styles/SearchResults.css";
import { useNavigate } from "react-router-dom";

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
          img={pokemon.sprites.other.dream_world.front_default}
          types={pokemon.types}
          height={pokemon.height}
          weight={pokemon.weight}
          expandCard={expandCard}
          darkMode={darkMode}
        />
      ) : (
        <div className={`error-message-text ${darkMode ? "dark-mode" : ""}`}>
          We could not find the Pokémon you searched for
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
