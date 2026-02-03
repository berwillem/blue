import { useState } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { motion } from "@motionone/react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function Navbar({
  links,
}: {
  links: { name: string; path: string }[];
}) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Fonction utilitaire pour vérifier si c'est un PDF
  const isPdf = (path: string) => path.endsWith(".pdf");

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navContainer"
    >
      <div className="navBox">
        {/* Left: Logo */}
        <Link to="/">
          <div className="logo">
            Blu<span>.</span>
          </div>
        </Link>

        {/* Middle: Links (Desktop) */}
        <ul className="navLinks">
          {links.map((link) => (
            <li key={link.path}>
              {isPdf(link.path) ? (
                <a href={link.path} target="_blank" rel="noopener noreferrer">
                  {t(`navbar.${link.name}`)}
                </a>
              ) : (
                <Link to={link.path}>{t(`navbar.${link.name}`)}</Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <ul className={open ? "open mobile-nav-links" : "mobile-nav-links"}>
          <div className="top-nav">
            <Link to="/" onClick={() => setOpen(false)}>
              <div className="logo">
                Blu<span>.</span>
              </div>
            </Link>
            <div className="CLOSE">
              <IoClose onClick={() => setOpen(false)} />
            </div>
          </div>
          
          {links.map((link, index) => (
            <li key={index} onClick={() => setOpen(false)}>
              {isPdf(link.path) ? (
                <a href={link.path} target="_blank" rel="noopener noreferrer">
                  {t(`navbar.${link.name}`)}
                </a>
              ) : (
                <Link to={link.path}>{t(`navbar.${link.name}`)}</Link>
              )}
            </li>
          ))}

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
            <Link to="/contact" className="contact-btn" onClick={() => setOpen(false)}>
              {t("navbar.contact")}
            </Link>
          </div>
        </ul>

        {/* Right: Actions */}
        <div className="navActions">
          <button className="langBtn">
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
          </button>
          <Link to={"/contact"}>
            <button className="ctaBtn">{t("navbar.contact")}</button>
          </Link>
          <Menu className="menu" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </motion.nav>
  );
}