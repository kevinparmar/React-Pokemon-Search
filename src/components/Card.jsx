import "../assets/styles/Card.css";

export default function Card(props) {
  const { darkMode, sprites} = props;
  
  const img =
    sprites.other.dream_world.front_default !== null
      ? sprites.other.dream_world.front_default
      : sprites.other["official-artwork"].front_default;

   const type_badges = props.types.map((type, index) => {
    return (
      <span
        key={`${type.name}-${index}`}
        className={`type-badge ${darkMode ? "dark-mode" : ""}`}
      >
        {type.type.name}
      </span>
    );
  });

  return (
    <div
      className={`card ${darkMode ? "dark-mode" : ""}`}
      onClick={() => props.expandCard(props.id)}
    >
      <div
        className={`type-badges ${darkMode ? "dark-mode" : ""}`}
        key={props.id}
      >
        {type_badges}
      </div>
      <div className={`id-badge ${darkMode ? "dark-mode" : ""}`}>
        #{props.id}
      </div>
      <div className={`card-image-container ${darkMode ? "dark-mode" : ""}`}>
        <img
          className={`card-image ${darkMode ? "dark-mode" : ""}`}
          src={img}
          alt={props.name}
        ></img>
      </div>
      <div className={`card-info-container ${darkMode ? "dark-mode" : ""}`}>
        <p className={`pokemon-name ${darkMode ? "dark-mode" : ""}`}>
          {props.name.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
