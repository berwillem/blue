import "./Intro.css"
import placeholder from "../../assets/images/redaplaceholder.png";
export default function Intro() {
  return (
    <div className="intro-container">
      <img src={placeholder} alt="placeholder" />
      <h2>
        I conduct Blu to help people rebuild themselves—physically, mentally,
        and morally—so they can live with strength, purpose, and responsibility
        instead of exhaustion and confusion
      </h2>
    </div>
  );
}
