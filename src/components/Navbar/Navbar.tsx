import React, { useState } from "react";
import "./Navbar.css";
import { Globe } from "lucide-react"; // Using lucide-react for the icon
import { useTranslation } from "react-i18next";
import {motion} from "@motionone/react"

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
  return (
    <motion.nav  

  
  // Animation de lancement
  initial={{ y: -100, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }} 
  transition={{ duration: 0.8, ease: "easeOut" }}

  // Garde tes styles existants
className="navContainer"
>
      <div className="navBox">
        {/* Left: Logo */}
        <div className="logo">
         Blu<span>.</span>
        </div>

        {/* Middle: Links */}
        <ul className="navLinks">
          {links.map((link) => (
          <li><a key={link.path} href={link.path}>{t(`navbar.${link.name}`)}</a></li>
          ))}
        </ul>
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
          <Link key={index} to={link.path} onClick={() => setOpen(false)}>
            <li >{t(`navbar.${link.name}`)}</li>
          </Link>
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

          <Link
            to="/contact"
            className="contact-btn"
            onClick={() => setOpen(false)}
          >
            {t("navbar.contact")}
          </Link>
        </div>
      </ul>
        {/* Right: Actions */}
        <div className="navActions">
          <button className="langBtn" onClick={() => changeLanguage(currentLanguage === "en" ? "fr" : "en")}>
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
          <button className="ctaBtn">{t("navbar.contact")}</button>
            <Menu  className="menu" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </motion.nav >
  );
}