import {
  fetchTotalPokemonCount,
  fetchPokemonRangeData,
} from "../services/pokeApi";
import "../assets/styles/Main.css";
import Searchbar from "./Searchbar";
import Card from "./Card";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

export default function Main(props) {

  const [totalPokemonCount, setTotalPokemonCount] = useState(null);
  
  const {
    pokemonData,
    setPokemonData,
    isLoading,
    setIsLoading,
    pageNumber,
    setPageNumber,
    selectedPokemon,
    setSelectedPokemon,
    searchState,
    setSearchState,
    searchedPokemon,
    setSearchedPokemon,
    expandCard,
    closeCard,
    search,
    darkMode,
  } = props;

  const start = pageNumber * 8 + 1;
  const end = start + 7;

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const totalCount = await fetchTotalPokemonCount();
        setTotalPokemonCount(totalCount);
      } catch (error) {
        console.error("Error fetching total Pokemon count:", error);
      }
    };

    fetchTotalCount();
  }, []);

  const totalPages = Math.ceil(totalPokemonCount / 8);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      setPokemonData(await fetchPokemonRangeData(start, end));
      setIsLoading(false);
    }
    fetchData();
  }, [pageNumber]);

  const cards = pokemonData.map((pokemon) => (
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
  ));

  function navigate(where) {
    if (where === "prev") {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    } else {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }

  return (
    <main className={`main ${darkMode ? "dark-mode" : ""}`}>
      <section className={`search-section ${darkMode ? "dark-mode" : ""}`}>
        <Searchbar
          handleSearch={(searchText) => search(searchText)}
          darkMode={darkMode}
        />
      </section>

      {isLoading && (
        <h1 className={`loading ${darkMode ? "dark-mode" : ""}`}>Loading...</h1>
      )}

      <section className={`card-section ${darkMode ? "dark-mode" : ""}`}>
        {!isLoading && cards}
      </section>

      <section className={`pagination-section ${darkMode ? "dark-mode" : ""}`}>
        {!isLoading && (
          <Pagination
            currentPage={pageNumber + 1}
            totalPages={totalPages}
            navigate={navigate}
            darkMode={darkMode}
          />
        )}
      </section>
    </main>
  );
}
