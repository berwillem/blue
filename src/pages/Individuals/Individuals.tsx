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
import { Link, useLocation } from "react-router-dom";
import FirstIntro from "../../components/FirstIntro/FirstIntro";
import { useUserTypeStore } from "../../store/useUserTypeStore";

import JoinUsCompo from "../../components/Content/JoinUsCompo/JoinUsCompo";
import { useEffect } from "react";

export default function Individuals() {
  const { t } = useTranslation();
const location = useLocation();

// @ts-nocheck
useEffect(() => {
  const handleHashScroll = () => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      // On attend que React ait fini de rendre les composants
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // On calcule la position réelle pour éviter les conflits de Snap Scroll
          const yOffset = -90; // La hauteur de ta navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 800); // Délai un peu plus long pour laisser le snap se stabiliser
    }
  };

  handleHashScroll();
}, [location.pathname, location.hash]); // On surveille le hash précisément
  // On récupère le tableau brut des sections via t() avec returnObjects
  const sectionsData = t("individuals.sections", { returnObjects: true });
  const images = [placeholder1, placeholder2, placeholder3];

  // On combine les textes traduits avec les images locales
  const DATA = sectionsData.map((item, idx) => ({
    ...item,
    img: images[idx],
  }));
  const userType = useUserTypeStore((state) => state.userType);
  const links = [
    { name: "home", path: "/" },
    {
      name: "about",
      path: userType == "individuals" ? "/individuals" : "/corporates",
    },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    {
      name: "joinus",
      path:
        userType == "individuals"
          ? "/individuals#joinus"
          : "/joinus",
    },
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
        <div className="snap-panel" id="content1">
          <Content DATA={DATA} DATA2={DATA[0]} />
        </div>
        <div className="snap-panel" id="content2">
          <Content DATA={DATA} DATA2={DATA[1]} />
        </div>
        <div className="snap-panel" id="content3">
          <Content DATA={DATA} DATA2={DATA[2]} />
        </div>
      </div>

      <Last />
      <JoinUsCompo />
      <Footer />

      <Link to="/contact" className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}
