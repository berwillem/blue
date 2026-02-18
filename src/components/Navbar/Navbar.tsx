// @ts-nocheck
import { useState, useRef } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Navbar({ links }) {
  const [open, setOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef(null);
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const userType = useUserTypeStore((state) => state.userType);

  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";
  const contactButton = userType === "individuals" ? t("navbar.contact2") : t("navbar.contact");

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

// @ts-nocheck

const scrollToSection = (e, id, path, index) => {
  // 1. On ferme les menus mobiles
  setOpen(false);
  setMobileServicesOpen(false);

  // 2. Gestion de la navigation inter-pages
  // Si on n'est pas sur la bonne page (ex: de /contact vers /individuals#joinus)
  if (location.pathname !== path.split('#')[0]) {
    // On laisse le <Link> de React Router faire la navigation vers la nouvelle page
    return; 
  }

  // 3. Si on est déjà sur la page, on force le scroll manuel
  e.preventDefault();

  // On attend un petit peu que le menu mobile se ferme (animation CSS)
  setTimeout(() => {
    let targetElement = null;

    // A. On cherche d'abord par ID direct (ex: joinus, why, section-0)
    targetElement = document.getElementById(id);

    // B. Si non trouvé et qu'on est sur mobile, on cherche par l'index du wrapper (pour les services)
    if (!targetElement && window.innerWidth < 1280 && index !== undefined) {
      const wrappers = document.querySelectorAll('.content-scroll-wrapper');
      targetElement = wrappers[index];
    }

    // C. Exécution du Scroll
    if (targetElement) {
      const offset = 80; // Hauteur de ta navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });

      // Mettre à jour l'URL sans recharger la page
      navigate(`${path}`, { replace: true });
    } else {
      console.warn("Cible non trouvée pour l'ID:", id);
    }
  }, 300);
};
  const serviceItemsAll = userType === "individuals" 
    ? [
        { name: t("navbar.services_indiv.why"), path: "/individuals", target: "why" },
        { name: t("navbar.services_indiv.what"), path: "/individuals", target: "section-0", idx: 0 },
        { name: t("navbar.services_indiv.how"), path: "/individuals", target: "section-1", idx: 1 },
        { name: t("navbar.services_indiv.privacy"), path: "/individuals", target: "section-2", idx: 2 },
        { name: t("navbar.services_indiv.test"), path: "/individuals", target: "last", idx: 3 },
      ]
    : [
        { name: t("navbar.services_corp.governance"), path: "/corporates", target: "section-0", idx: 0 },
        { name: t("navbar.services_corp.finance"), path: "/corporates", target: "section-1", idx: 1 },
        { name: t("navbar.services_corp.business"), path: "/corporates", target: "section-2", idx: 2 },
        { name: t("navbar.services_corp.leadership"), path: "/corporates", target: "section-3", idx: 3 },
        { name: t("navbar.services_corp.excellence"), path: "/corporates", target: "section-4", idx: 4 },
        { name: t("navbar.services_corp.training"), path: "/corporates", target: "section-5", idx: 5 },
        { name: t("navbar.services_corp.coaching"), path: "/corporates", target: "section-6", idx: 6 },
      ];

  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="navContainer">
      <div className="navBox">
        <Link to="/"><div className="logo">Blu<span>.</span></div></Link>

        {/* Desktop Links (Restauré avec linkWrapper) */}
        <ul className="navLinks">
          {links.map((link) => {
            const isServices = link.name === "services";
            return (
              <li key={link.path} className="navItemRel" 
                  onMouseEnter={() => isServices && (timeoutRef.current = setTimeout(() => setIsServicesHovered(true), 10))} 
                  onMouseLeave={() => { clearTimeout(timeoutRef.current); setIsServicesHovered(false); }}>
                <div className="linkWrapper">
                    <Link to={link.path} className="mainLink">
                      {t(`navbar.${link.name}`)}
                      {isServices && <ChevronDown size={14} className={isServicesHovered ? "rotate" : ""} />}
                    </Link>
                </div>
                {isServices && (
                  <AnimatePresence>
                    {isServicesHovered && (
                      <motion.ul className="dropdownMenu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                        {serviceItemsAll.map((item, idx) => (
                          <li key={idx}>
                            <Link to={`${item.path}#${item.target}`} onClick={(e) => scrollToSection(e, item.target, item.path, item.idx)}>
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

        <div className="navActions">
          <div className="langBtnPC">
            <span onClick={() => changeLanguage("en")} className={i18n.language === "en" ? "selected-language" : ""}>EN</span>
            <span onClick={() => changeLanguage("fr")} className={i18n.language === "fr" ? "selected-language" : ""}>FR</span>
          </div>
          <Link to={contactPath}><button className="ctaBtn">{contactButton}</button></Link>
          <Menu className="menu" onClick={() => setOpen(true)} />
        </div>
      </div>

      {/* Mobile Menu (Restauré avec nav-infos2) */}
      <ul className={open ? "open mobile-nav-links" : "mobile-nav-links"}>
        <div className="top-nav">
          <Link to="/" onClick={() => setOpen(false)}><div className="logo">Blu<span>.</span></div></Link>
          <div className="CLOSE"><IoClose onClick={() => setOpen(false)} /></div>
        </div>

        {links.map((link, index) => (
          <li key={index}>
            {link.name === "services" ? (
              <div className="mobile-services-wrapper">
                <div className="mainLink mobile-trigger" onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                  {t(`navbar.${link.name}`)}
                  <ChevronDown size={20} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.3s" }} />
                </div>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", listStyle: "none", paddingLeft: "20px" }}>
                      {serviceItemsAll.map((item, i) => (
                        <li key={i} style={{ padding: "10px 0" }}>
                          <Link to={`${item.path}#${item.target}`} onClick={(e) => scrollToSection(e, item.target, item.path, item.idx)}>{item.name}</Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to={link.path} onClick={() => setOpen(false)}>{t(`navbar.${link.name}`)}</Link>
            )}
          </li>
        ))}

        <div className="nav-infos2">
          <div className="languages">
            <span onClick={() => { changeLanguage("en"); setOpen(false); }}>EN</span>
            <span onClick={() => { changeLanguage("fr"); setOpen(false); }}>FR</span>
          </div>
          <Link to={contactPath} className="contact-btn" onClick={() => setOpen(false)}>{contactButton}</Link>
        </div>
      </ul>
    </motion.nav>
  );
}