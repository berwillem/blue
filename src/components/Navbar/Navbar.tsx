// @ts-nocheck
import { useState, useRef } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const userType = useUserTypeStore((state) => state.userType);

  const contactPath = userType === "individuals" ? "/contact" : "/contactb2b";
  const contactButton = userType === "individuals" ? t("navbar.contact2") : t("navbar.contact");

  const scrollToSection = (e: React.MouseEvent, id: string, path: string) => {
    e.preventDefault();
    setOpen(false);
    setMobileServicesOpen(false);

    // Navigation si on change de page
    if (window.location.pathname !== path) {
      navigate(`${path}#${id}`);
      return;
    }

    setTimeout(() => {
      // --- MODIFICATION ICI ---
      const st = window.introTrigger; 
      const element = document.getElementById(id);

      if (id === "why" && st) {
        // Scroll vers la position de fin calculée par GSAP
        window.scrollTo({
          top: st.end, 
          behavior: "smooth"
        });
      } else if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsServicesHovered(false), 300);
  };

  const serviceItemsAll = userType === "individuals" 
    ? [
        { name: t("navbar.services_indiv.why"), path: "/individuals", target: "why" },
        { name: t("navbar.services_indiv.what"), path: "/individuals", target: "section-0" },
        { name: t("navbar.services_indiv.how"), path: "/individuals", target: "section-1" },
        { name: t("navbar.services_indiv.privacy"), path: "/individuals", target: "section-2" },
        { name: t("navbar.services_indiv.test"), path: "/individuals", target: "last" },
      ]
    : [
        { name: t("navbar.services_corp.governance"), path: "/corporates", target: "section-0" },
        { name: t("navbar.services_corp.finance"), path: "/corporates", target: "section-1" },
        { name: t("navbar.services_corp.business"), path: "/corporates", target: "section-2" },
        { name: t("navbar.services_corp.leadership"), path: "/corporates", target: "section-3" },
        { name: t("navbar.services_corp.excellence"), path: "/corporates", target: "section-4" },
        { name: t("navbar.services_corp.training"), path: "/corporates", target: "section-5" },
        { name: t("navbar.services_corp.coaching"), path: "/corporates", target: "section-6" },
      ];

  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="navContainer">
      <div className="navBox">
        <Link to="/"><div className="logo">Blu<span>.</span></div></Link>

        <ul className="navLinks">
          {links.map((link) => {
            const isServices = link.name === "services";
            return (
              <li key={link.path} className="navItemRel" onMouseEnter={() => isServices && handleMouseEnter()} onMouseLeave={() => isServices && handleMouseLeave()}>
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
                            <Link to={`${item.path}#${item.target}`} onClick={(e) => scrollToSection(e, item.target, item.path)}>
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
            <span onClick={() => i18n.changeLanguage("en")} className={currentLanguage === "en" ? "selected-language" : ""}>EN</span>
            <span onClick={() => i18n.changeLanguage("fr")} className={currentLanguage === "fr" ? "selected-language" : ""}>FR</span>
          </div>
          <Link to={contactPath}><button className="ctaBtn">{contactButton}</button></Link>
          <Menu className="menu" onClick={() => setOpen(!open)} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={open ? "open mobile-nav-links" : "mobile-nav-links"}>
          <div className="top-nav">
            <Link to="/" onClick={() => setOpen(false)}><div className="logo">Blu<span>.</span></div></Link>
            <div className="CLOSE"><IoClose onClick={() => setOpen(false)} /></div>
          </div>
          {serviceItemsAll.map((item, idx) => (
            <li key={idx}>
              <Link to={`${item.path}#${item.target}`} onClick={(e) => scrollToSection(e, item.target, item.path)}>
                {item.name}
              </Link>
            </li>
          ))}
      </div>
    </motion.nav>
  );
}