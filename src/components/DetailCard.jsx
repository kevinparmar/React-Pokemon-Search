import "../assets/styles/DetailCard.css";

export default function DetailCard(props) {
  let { name, id, height, weight, abilities, species, stats, sprites } =
    props.pokemonData;
  const { darkMode } = props;

  abilities = abilities.map((ability, index) => (
    <h3 key={index} className="ability">
      {ability.ability.name}
    </h3>
  ));

  const renderStats = () => {
    return stats.map((stat) => (
      <div key={stat.stat.name} className="stat-bar">
        <p className="stat-name">{stat.stat.name.toUpperCase()}</p>
        <div className={`progress ${darkMode ? "dark-mode" : ""}`}>
          <div
            className={`progress-bar ${darkMode ? "dark-mode" : ""}`}
            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
          >
            {stat.base_stat}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={`detail-card ${darkMode ? "dark-mode" : ""}`}>
      <button
        className={`close-button ${darkMode ? "dark-mode" : ""}`}
        onClick={props.closeCard}
      >
        <img
          className={`close-button-icon ${darkMode ? "dark-mode" : ""}`}
          src="src/assets/images/close-window.png"
        ></img>
      </button>
      <div
        className={`detail-card-image-container ${darkMode ? "dark-mode" : ""}`}
      >
        <img
          className="detail-card-image"
          src={sprites.other.dream_world.front_default}
        ></img>
        <h1 className={`detail-pokemon-name ${darkMode ? "dark-mode" : ""}`}>
          {name.toUpperCase()}
        </h1>
      </div>
      <div
        className={`detail-card-info-container ${darkMode ? "dark-mode" : ""}`}
      >
        <div className={`body-details ${darkMode ? "dark-mode" : ""}`}>
          <div className={`height-container ${darkMode ? "dark-mode" : ""}`}>
            {height + "ft"}
          </div>
          <div className={`weight-container ${darkMode ? "dark-mode" : ""}`}>
            {weight + "kg"}
          </div>
        </div>
        <div className={`ability-container ${darkMode ? "dark-mode" : ""}`}>
          {"Ability:  "}
          {abilities}
        </div>
      </div>
      <div className={`stats-container ${darkMode ? "dark-mode" : ""}`}>
        {renderStats()}
      </div>
    </div>
  );
}
