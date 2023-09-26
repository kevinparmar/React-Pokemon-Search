import "../assets/styles/Pagination.css";
import navigationicon from "../assets/images/prev-next.png"; 

export default function Pagination(props) {
  return (
    <div
      className={`pagination-container ${props.darkMode ? "dark-mode" : ""}`}
    >
      <button
        className={`prev-button ${props.darkMode ? "dark-mode" : ""}`}
        onClick={() => props.navigate("prev")}
        disabled={props.currentPage === 1}
      >
        <img src={navigationicon} alt="Previous"></img>
      </button>
      <p className={`pageno-display ${props.darkMode ? "dark-mode" : ""}`}>
        {props.currentPage} of {props.totalPages}
      </p>
      <button
        className={`next-button ${props.darkMode ? "dark-mode" : ""}`}
        onClick={() => props.navigate("next")}
        disabled={props.currentPage === props.totalPages}
      >
        <img src={navigationicon} alt="Next"></img>
      </button>
    </div>
  );
}
