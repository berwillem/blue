import "./Corporates.css";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Why from "../../components/Why/Why";
import placeholder1 from "../../assets/images/corporates1.jpg";
import placeholder2 from "../../assets/images/corporates2.jpg";
import placeholder3 from "../../assets/images/corporates3.jpg";
import placeholder4 from "../../assets/images/corporates4.jpg";
import placeholder5 from "../../assets/images/corporates5.jpg";
import placeholder6 from "../../assets/images/corporates6.jpg";
import placeholder7 from "../../assets/images/corporates7.jpg";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import IntroCorp from "../../components/IntroCorp/IntroCorp";
import Modus from "../../components/Modus/Modus";
import { useTranslation } from "react-i18next";

export default function Corporates() {
    const { t } = useTranslation();
const links = [
  { name: "home", path: "/corporates" },
  { name: "about", path: "/about" },
  { name: "services", path: "#" },
  { name: "joinus", path: "/joinus" },
  { name: "privacy", path: "/privacy.pdf", isExternal: true }, // Ajout ici
];
  // On récupère le tableau brut des sections via t() avec returnObjects
  const sectionsData = t("sections2", { returnObjects: true });
  const images = [placeholder1, placeholder2, placeholder3,placeholder4 ,placeholder5,placeholder6,placeholder7];

  // On combine les textes traduits avec les images locales
  const DATA = sectionsData.map((item, idx) => ({
    ...item,
    img: images[idx],
  }));
  return (
    <div className="corporates-container">
      <Navbar links={links} />
      <IntroCorp></IntroCorp>

      <div className="scroll-container">
        <section className="snap-section video1"> </section>
        <section className="snap-section video2">
          {" "}
          <Why />
        </section>
        <section className="normal-section">
           <div className="snap-group-container">
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
             <div className="snap-panel"><Content DATA={DATA}/></div>
        
           </div>
          <Modus></Modus>
          <Footer />
        </section>
      </div>
    </div>
  );
}
