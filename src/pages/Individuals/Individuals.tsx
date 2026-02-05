// @ts-nocheck
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Content from "../../components/Content/Content";
import Last from "../../components/Last/Last";
import Footer from "../../components/Footer/Footer";
import "./Individuals.css";
import placeholder1 from "../../assets/images/redacontent1.jpg";
import placeholder2 from "../../assets/images/redcontent2.jpg";
import placeholder3 from "../../assets/images/redacontent3.jpg";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import FirstIntro from "../../components/FirstIntro/FirstIntro";

export default function Individuals() {
  const { t } = useTranslation();

  // On récupère le tableau brut des sections via t() avec returnObjects
  const sectionsData = t("individuals.sections", { returnObjects: true });
  const images = [placeholder1, placeholder2, placeholder3];

  // On combine les textes traduits avec les images locales
  const DATA = sectionsData.map((item, idx) => ({
    ...item,
    img: images[idx],
  }));

  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
    { name: "privacy", path: "/privacy.pdf", isExternal: true },
  ];

  return (
    <div className="mainWrapper">
      <div className="navbar-anim">
        <Navbar links={links} />
      </div>
      <FirstIntro />
      <Intro buttonText={t("individuals.button")} />

      <div className="snap-group-container">
        {/* On crée 3 panneaux, mais chaque panneau connaît toute la DATA */}
        <div className="snap-panel">
          <Content DATA={DATA} DATA2={DATA[0]} />
        </div>
        <div className="snap-panel">
          <Content DATA={DATA} DATA2={DATA[1]} />
        </div>
        <div className="snap-panel">
          <Content DATA={DATA} DATA2={DATA[2]} />
        </div>
      </div>

      <Last />
      <Footer />

      <Link to="/contact" className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}
