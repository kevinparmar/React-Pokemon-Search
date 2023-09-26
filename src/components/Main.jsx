//before changes
import {
  fetchTotalPokemonCount,
  fetchPokemonRangeData,
} from "../services/pokeApi";
import "../assets/styles/Main.css";
import Searchbar from "./Searchbar";
import Card from "./Card";
import Pagination from "./Pagination";
import { useEffect } from "react";

const totalPokemonCount = await fetchTotalPokemonCount();
const totalPages = Math.ceil(totalPokemonCount / 8);

export default function Main(props) {
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
      img={pokemon.sprites.other.dream_world.front_default}
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
