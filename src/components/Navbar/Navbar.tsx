// @ts-nocheck
import { useState, useRef } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Ajout de useNavigate
import { IoClose } from "react-icons/io5";
import { useUserTypeStore } from "../../store/useUserTypeStore";

interface NavLink {
  name: string;
  path: string;
}

export default function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook pour changer l'URL manuellement
  const currentLanguage = i18n.language;

  const userType = useUserTypeStore((state) => state.userType);
  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";
  const contactButton = userType === "individuals" ? t("navbar.contact2") : t("navbar.contact");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isPdf = (path: string) => path.endsWith(".pdf");

  // Fonction de scroll améliorée qui met à jour l'URL
  const scrollToSection = (e: React.MouseEvent, id: string, path: string) => {
    e.preventDefault();
    
    // 1. Mettre à jour l'URL (pour que le # apparaissent dans la barre d'adresse)
    navigate(`${path}#${id}`);

    // 2. Fermer les menus
    setOpen(false);
    setMobileServicesOpen(false);
    setIsServicesHovered(false);

    // 3. Exécuter le scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; 
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

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
    }, 300);
  };

 // @ts-nocheck

  const serviceItems = [
    { name: t("navbar.services_indiv.why"), path: "/individuals", target: "why", target2: "why" },
    { name: t("navbar.services_indiv.what"), path: "/individuals", target: "section-0", target2: "content1" },
    { name: t("navbar.services_indiv.how"), path: "/individuals", target: "section-1", target2: "content2" },
    { name: t("navbar.services_indiv.privacy"), path: "/individuals", target: "section-2", target2: "content3" },
    { name: t("navbar.services_indiv.test"), path: "/individuals", target: "last", target2: "last" },
  ];

  const serviceItems2 = [
    { name: t("navbar.services_corp.governance"), path: "/corporates", target: "section-0", target2: "content1" },
    { name: t("navbar.services_corp.finance"), path: "/corporates", target: "section-1", target2: "content2" },
    { name: t("navbar.services_corp.business"), path: "/corporates", target: "section-2", target2: "content3" },
    { name: t("navbar.services_corp.leadership"), path: "/corporates", target: "section-3", target2: "content4" },
    { name: t("navbar.services_corp.excellence"), path: "/corporates", target: "section-4", target2: "content5" },
    { name: t("navbar.services_corp.training"), path: "/corporates", target: "section-5", target2: "content6" },
    { name: t("navbar.services_corp.coaching"), path: "/corporates", target: "section-6", target2: "content7" },
  ];



  const serviceItemsAll = userType === "individuals" ? serviceItems : serviceItems2;

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
                            <Link 
                              to={`${item.path}#${item.target}`} 
                              onClick={(e) => scrollToSection(e, item.target, item.path)}
                            >
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
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
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
                            <Link 
                              to={`${item.path}#${item.target2}`} 
                              onClick={(e) => scrollToSection(e, item.target2, item.path)}
                            >
                              {item.name}
                            </Link>
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
            <Link to={contactPath} className="contact-btn" onClick={() => setOpen(false)}>{contactButton}</Link>
          </div>
        </ul>

        {/* Desktop Actions */}
        <div className="navActions">
          <div className="langBtnPC">
            <span onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
            <span onClick={() => changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
          </div>
          <Link to={contactPath}><button className="ctaBtn">{contactButton}</button></Link>
          <Menu className="menu" onClick={() => setOpen(!open)} />
        </div>
      </div>
    </motion.nav>
  );
}