import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import DetailCard from "./components/DetailCard";
import SearchResults from "./components/SearchResults";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSinglePokemonData } from "./services/pokeApi";

export default function App() {
  const routerNavigate = useNavigate();
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchState, setSearchState] = useState(false);
  const initialSearchedPokemon = localStorage.getItem("searchedPokemon");
  const [searchedPokemon, setSearchedPokemon] = useState(
    initialSearchedPokemon ? JSON.parse(initialSearchedPokemon) : null
  );

  useEffect(() => {
    localStorage.setItem("searchedPokemon", JSON.stringify(searchedPokemon));
  }, [searchedPokemon]);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchedPokemon(null);
    }
  }, [location.pathname]);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  async function search(searchText) {
    if(searchText === ""){
      setSearchedPokemon(null);
    } else {
      const pokemon = await fetchSinglePokemonData(searchText.toLowerCase());
      if (pokemon !== null) {
        setSearchedPokemon(pokemon);
      } else {
        setSearchedPokemon(null);
      }
    }
    routerNavigate("/search-results");
  }

  const expandCard = (id) => {
    setSelectedPokemon(id);
  };

  const closeCard = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="App">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
              searchState={searchState}
              setSearchState={setSearchState}
              searchedPokemon={searchedPokemon}
              setSearchedPokemon={setSearchedPokemon}
              search={search}
              expandCard={expandCard}
              closeCard={closeCard}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="/search-results"
          element={
            <SearchResults
              pokemon={searchedPokemon}
              expandCard={expandCard}
              darkMode={darkMode}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {selectedPokemon !== null && (
        <div className="overlay">
          <DetailCard
            key={selectedPokemon}
            pokemonData={
              searchedPokemon
                ? searchedPokemon
                : pokemonData.find((pokemon) => pokemon.id === selectedPokemon)
            }
            closeCard={closeCard}
            darkMode={darkMode}
          />
        </div>
      )}
    </div>
  );
}
