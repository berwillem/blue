// @ts-nocheck
import { useState } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
// 1. Import du store
import { useUserTypeStore } from "../../store/useUserTypeStore"; 

interface NavLink {
  name: string;
  path: string;
}

export default function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // 2. Récupération du type d'utilisateur
  const userType = useUserTypeStore((state) => state.userType);

  // 3. Définition du chemin dynamique
  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isPdf = (path: string) => path.endsWith(".pdf");

  const serviceItems = [
    { name: "Metabolic Health", path: "#" },
    { name: "Corporate Wellness", path: "#" },
    { name: "Individual Mentoring", path: "#" },
  ];

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
          {links.map((link) => {
            const isServices = link.name === "services";
            return (
              <li
                key={link.path}
                className="navItemRel"
                onMouseEnter={() => isServices && setIsServicesHovered(true)}
                onMouseLeave={() => isServices && setIsServicesHovered(false)}
              >
                <div className="linkWrapper">
                  {isPdf(link.path) ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer">
                      {t(`navbar.${link.name}`)}
                    </a>
                  ) : (
                    <Link to={link.path} className="mainLink">
                      {t(`navbar.${link.name}`)}
                      {isServices && (
                        <ChevronDown 
                          size={14} 
                          className={`chevron ${isServicesHovered ? "rotate" : ""}`} 
                        />
                      )}
                    </Link>
                  )}
                </div>

                {isServices && (
                  <AnimatePresence>
                    {isServicesHovered && (
                      <motion.ul
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="dropdownMenu"
                      >
                        {serviceItems.map((item, idx) => (
                          <li key={idx}>
                            <Link to={item.path} onClick={() => setIsServicesHovered(false)}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Overlay */}
        <ul className={open ? "open mobile-nav-links" : "mobile-nav-links"}>
          <div className="top-nav">
            <Link to="/" onClick={() => setOpen(false)}>
              <div className="logo">Blu<span>.</span></div>
            </Link>
            <div className="CLOSE">
              <IoClose onClick={() => setOpen(false)} />
            </div>
          </div>

          {links.map((link, index) => (
            <li key={index} onClick={() => setOpen(false)}>
              {isPdf(link.path) ? (
                <a href={link.path} target="_blank">{t(`navbar.${link.name}`)}</a>
              ) : (
                <Link to={link.path}>{t(`navbar.${link.name}`)}</Link>
              )}
            </li>
          ))}

          <div className="nav-infos2">
            <div className="languages">
              <span onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
              <span onClick={() => changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
            </div>
            {/* 4. Mise à jour du lien Mobile */}
            <Link to={contactPath} className="contact-btn" onClick={() => setOpen(false)}>
              {t("navbar.contact")}
            </Link>
          </div>
        </ul>

        {/* Right: Actions */}
        <div className="navActions">
          <div className="langBtnPC">
            <span onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
            <span onClick={() => changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
          </div>
          {/* 5. Mise à jour du lien Desktop */}
          <Link to={contactPath}>
            <button className="ctaBtn">{t("navbar.contact")}</button>
          </Link>
          <Menu className="menu" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </motion.nav>
  );
}