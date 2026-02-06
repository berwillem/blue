// @ts-nocheck
import { useState, useRef } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useUserTypeStore } from "../../store/useUserTypeStore"; 

interface NavLink {
  name: string;
  path: string;
}

export default function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // État pour le clic mobile
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const userType = useUserTypeStore((state) => state.userType);
  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";


  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isPdf = (path: string) => path.endsWith(".pdf");

 const scrollToSection = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  setOpen(false); // Ferme d'abord le menu pour libérer le scroll du body
  setMobileServicesOpen(false);

  // Un petit timeout pour laisser le temps au menu de se fermer
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Hauteur de ta navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, 300);
};

  // Logic Hover Desktop
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
    }, 300);
  };

  const serviceItems = [
    { name: "Why we do what we do?", target: "section-0" ,target2:"content1" },
    { name: "what we do?", target: "section-1" ,target2:"content2"},
    { name: "How we do?", target: "section-2" ,target2:"content3"},
  ];
  const serviceItems2 = [
    { name: "Governance", target: "section-0" ,target2:"content1" },
    { name: "Financial Performance & Value Creation", target: "section-1" ,target2:"content2"},
    { name: "Business", target: "section-2" ,target2:"content3"},
    { name: "Leadership & Human Systems", target: "section-2" ,target2:"content4"},
    { name: "Organizational Change & Operational Excellence", target: "section-2" ,target2:"content5"},
    { name: "Organizational Training", target: "section-2" ,target2:"content6"},
    { name: "Coaching & Mentoring Programs for Executives", target: "section-2" ,target2:"content7"},
  ];
  const serviceItemsAll = userType === "individuals" ? serviceItems :serviceItems2;
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navContainer"
    >
      <div className="navBox">
        <Link to="/"><div className="logo">Blu<span>.</span></div></Link>

        {/* Desktop Links */}
        <ul className="navLinks">
          {links.map((link) => {
            const isServices = link.name === "services";
            return (
              <li
                key={link.path}
                className="navItemRel"
                onMouseEnter={() => isServices && handleMouseEnter()}
                onMouseLeave={() => isServices && handleMouseLeave()}
              >
                <div className="linkWrapper">
                  {isPdf(link.path) ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer">{t(`navbar.${link.name}`)}</a>
                  ) : (
                    <Link to={link.path} className="mainLink">
                      {t(`navbar.${link.name}`)}
                      {isServices && <ChevronDown size={14} className={isServicesHovered ? "rotate" : ""} />}
                    </Link>
                  )}
                </div>
                {isServices && (
                  <AnimatePresence>
                    {isServicesHovered && (
                      <motion.ul 
                        className="dropdownMenu"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        {serviceItemsAll.map((item, idx) => (
                          <li key={idx}>
                            <a href={`#${item.target}`} onClick={(e) => scrollToSection(e, item.target)}>{item.name}</a>
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
            <Link to="/" onClick={() => setOpen(false)}><div className="logo">Blu<span>.</span></div></Link>
            <div className="CLOSE"><IoClose onClick={() => setOpen(false)} /></div>
          </div>

          {links.map((link, index) => (
            <li key={index}>
              {link.name === "services" ? (
            <div className="mobile-services-wrapper">
        <div 
          className="mainLink mobile-trigger" 
          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", cursor: "pointer" }}
        >
          {t(`navbar.${link.name}`)}
          <ChevronDown size={20} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.3s" }} />
        </div>
        
        <AnimatePresence>
          {mobileServicesOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden", paddingLeft: "20px", listStyle: "none" }}
            >
              {serviceItemsAll.map((item, idx) => (
                <li key={idx} style={{ padding: "10px 0" }}>
                  {/* CORRECTION ICI : On utilise item.target2 pour le mobile */}
                  <a href={`#${item.target2}`} onClick={(e) => scrollToSection(e, item.target2)}>
                    {item.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
              ) : (
                isPdf(link.path) ? (
                  <a href={link.path} target="_blank" onClick={() => setOpen(false)}>{t(`navbar.${link.name}`)}</a>
                ) : (
                  <Link to={link.path} onClick={() => setOpen(false)}>{t(`navbar.${link.name}`)}</Link>
                )
              )}
            </li>
          ))}

          <div className="nav-infos2">
            <div className="languages">
              <span onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
              <span onClick={() => changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
            </div>
            <Link to={contactPath} className="contact-btn" onClick={() => setOpen(false)}>
              {t("navbar.contact")}
            </Link>
          </div>
        </ul>

        <div className="navActions">
          <div className="langBtnPC">
            <span onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
            <span onClick={() => changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
          </div>
          <Link to={contactPath}><button className="ctaBtn">{t("navbar.contact")}</button></Link>
          <Menu className="menu" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </motion.nav>
  );
}