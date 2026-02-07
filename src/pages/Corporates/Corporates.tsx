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
import { Link, useLocation } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { useEffect } from "react";

export default function Corporates() {
  const { t } = useTranslation();
  const links = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
  { name: "privacy", path: "/privacy" },
  ];
  // On récupère le tableau brut des sections via t() avec returnObjects
  const sectionsData = t("sections2", { returnObjects: true });
  const images = [
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4,
    placeholder5,
    placeholder6,
    placeholder7,
  ];


  // On combine les textes traduits avec les images locales
  const DATA = sectionsData.map((item, idx) => ({
    ...item,
    img: images[idx],
  }));
  const { hash } = useLocation();

useEffect(() => {
  if (hash) {
    // On attend un tout petit peu que React finisse de rendre le contenu
    setTimeout(() => {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500); // 500ms pour être sûr que le contenu est chargé
  }
}, [hash]);
  return (
    <div className="mainWrapper b2b">

        <Navbar links={links} />
  

      <IntroCorp></IntroCorp>

      <div className="snap-group-container">
        {/* On crée 3 panneaux, mais chaque panneau connaît toute la DATA */}
        <div className="snap-panel" id="content1">
          <Content  DATA={DATA} DATA2={DATA[0]} />
        </div>
        <div className="snap-panel" id="content2">
          <Content DATA={DATA} DATA2={DATA[1]} />
        </div>
        <div className="snap-panel" id="content3">
          <Content DATA={DATA} DATA2={DATA[2]} />
        </div>
        <div className="snap-panel" id="content4">
          <Content DATA={DATA} DATA2={DATA[3]} />
        </div>
        <div className="snap-panel" id="content5">
          <Content DATA={DATA} DATA2={DATA[4]} />
        </div>
        <div className="snap-panel" id="content6">
          <Content DATA={DATA} DATA2={DATA[5]} />
        </div>
        <div className="snap-panel" id="content7">
          <Content DATA={DATA} DATA2={DATA[6]} />
        </div>
      </div>
      <Modus></Modus>
      <Footer />
      
      <Link to="/contactb2b" className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}
