import "./Navbar.css";
import logo1 from "../../assets/images/logo1.png";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const [isScrolled, setIsScrolled] = useState(false);
   const userType = useUserTypeStore((state) => state.userType);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Si on voit la section Why (même un tout petit peu), 
      // la navbar devient blanche.
      if (entry.isIntersecting) {
        setIsScrolled(true);
      } else {
        // Si Why n'est pas là, on vérifie si on est au-dessus ou en-dessous.
        // On utilise le "boundingClientRect" pour savoir si Why est en haut ou en bas.
        if (entry.boundingClientRect.top > 0) {
          setIsScrolled(false);
        }
      }
    },
    { 
      threshold: 0.9 // Déclenchement immédiat dès qu'un pixel apparaît
    }
  );

  // On cible Why ou la section qui suit l'Intro
  const secondSection = document.querySelector(".why-container");
  
  if (secondSection) {
    observer.observe(secondSection);
  }

  return () => observer.disconnect();
}, []);
  return (


    <nav style={{ backgroundColor: isScrolled ? "white" : "transparent" }}>
      <img src={logo1} alt="logo" />
      <div className="langMob">
            <span onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
            <span onClick={() => changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
             <Menu color="black" className="menu" onClick={() => setOpen(!open)} />
          </div>
     
      <ul className={open ? "open" : ""}>
        <div className="top-nav">
          <img src={logo1} alt="logo" />
          <div className="CLOSE">
            <IoClose onClick={() => setOpen(false)} />
          </div>
        </div>

        <Link to="/" onClick={() => setOpen(false)}>
          <li>{t("navbar.home")}</li>
        </Link>
        <Link to="/about" onClick={() => setOpen(false)}>
          <li>{t("navbar.about")}</li>
        </Link>
        <Link to="#" onClick={() => setOpen(false)}>
          <li>{t("navbar.why_us")}</li>
        </Link >
        <Link to="#" onClick={() => setOpen(false)}>
          <li>{t("navbar.services")}</li>
        </Link>
        <div className="nav-infos2">
          <div className="languages">
            <span
              onClick={() => changeLanguage("en")}
              className={currentLanguage === "en" ? "selected-language" : ""}
            >
              EN
            </span>
            <span
              onClick={() => changeLanguage("fr")}
              className={currentLanguage === "fr" ? "selected-language" : ""}
            >
              FR
            </span>
          </div>
          <button>{t("navbar.contact")}</button>
        </div>
      </ul>
      <div className="nav-infos">
        <div className="languages">
          <span
            onClick={() => changeLanguage("en")}
            className={currentLanguage === "en" ? "selected-language" : ""}
          >
            EN
          </span>
          <span
            onClick={() => changeLanguage("fr")}
            className={currentLanguage === "fr" ? "selected-language" : ""}
          >
            FR
          </span>
        </div>
        <button>{t("navbar.contact")}</button>
      </div>
    </nav>
  );
}
