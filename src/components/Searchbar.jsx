import { useState } from "react";
import "../assets/styles/Searchbar.css";

export default function Searchbar(props) {
  const { darkMode } = props;
  const [searchText, setSearchText] = useState("");

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      props.handleSearch(searchText);
    }
  }

  return (
    <div>
      <input
        type="text"
        name="search"
        id="searchbar"
        className="searchbar"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        type="submit"
        name="submit"
        className={`search-button ${darkMode ? "dark-mode" : ""}`}
        onClick={() => props.handleSearch(searchText)}
      >
        <img
          className="searchbar-icon"
          src="src/assets/images/search-icon.png"
        ></img>
      </button>
    </div>
  );
}
