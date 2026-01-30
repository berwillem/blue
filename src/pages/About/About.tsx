import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import redaabout from "../../assets/images/redaabout.png";
import Button from "../../ui/button/Button";
export default function About() {
  return (
    <div className="about-container">
      <Navbar></Navbar>
      <div className="about-content">
        <img src={redaabout} alt="about" />
        <p>
          Avec plus de 21 ans d’expérience dans des environnements exigeants —
          dont 15 années à des postes de responsabilités — Redha a longtemps
          évolué à haut niveau tout en faisant face à des difficultés
          personnelles bien réelles : surpoids, énergie faible, troubles de la
          concentration et déséquilibres métaboliques multiples.
        </p>
        <p>
          En parcourant son propre chemin de transformation, il a
          progressivement retrouvé une énergie durable, une clarté d’esprit
          profonde et une discipline plus stable et alignée.
        </p>
        <div className="button-about">
          <Button text="Book a meet" width="100%"></Button>
        </div>
      </div>
    </div>
  );
}
