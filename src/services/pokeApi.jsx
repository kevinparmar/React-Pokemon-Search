async function fetchSinglePokemonData(pokemonNameOrId) {
  try {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.log("Cannot find pokemon")
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
  }
}

async function fetchTotalPokemonCount() {
  try {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon-species";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching total Pokémon count:", error);
    throw error;
  }
}

async function fetchPokemonRangeData(start, end) {
  try {
    const pokemonDataArray = [];

    for (let i = start; i <= end; i++) {
      const pokemon = await fetchSinglePokemonData(i);
      pokemonDataArray.push(pokemon);
    }

    return pokemonDataArray;
  } catch (error) {
    console.error("Error fetching Pokemon data range:", error);
    throw error;
  }
}

export {
  fetchSinglePokemonData,
  fetchTotalPokemonCount,
  fetchPokemonRangeData,
};
