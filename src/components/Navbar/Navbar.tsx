import "./Navbar.css";
import logo1 from "../../assets/images/logo1.png";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { motion } from "framer-motion";

export default function Navbar({
  links,
}: {
  links: { name: string; path: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolled2, setIsScrolled2] = useState(false);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrolled(true);
        } else if (entry.boundingClientRect.top > 0) {
          setIsScrolled(false);
        }
      },
      { threshold: 0.9 }
    );

    // On cible Why ou la section qui suit l'Intro
    const secondSection = document.querySelector(".why-container");

    if (secondSection) {
      observer.observe(secondSection);
    }

    return () => observer.disconnect();
  }, []);


const navRef = useRef<HTMLElement | null>(null);
// ...existing code...
useEffect(() => {
  const isMobile = () => window.innerWidth < 1280;
  const isOverlap = (r1: DOMRect, r2: DOMRect) =>
    !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);

  // desktop: bounding rect overlap check
  const checkOverlap = () => {
    const navEl = navRef.current;
    if (!navEl) return;
    const targetDesktop = document.querySelector(".img-wrapper") as HTMLElement | null;
    if (!targetDesktop) {
      setIsScrolled2(false);
      return;
    }
    const rNav = navEl.getBoundingClientRect();
    const rTarget = targetDesktop.getBoundingClientRect();
    setIsScrolled2(isOverlap(rNav, rTarget));
  };

  // mobile: IntersectionObserver with 90% threshold on .img-scroll or .part2
  const mobileObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      if (!isMobile()) return; // ignore on desktop
      setIsScrolled2(entry.intersectionRatio >= 0.9);
    },
    { threshold: [0.9] }
  );

  const mobileTarget = document.querySelector(".img-scroll") || document.querySelector(".part2");
  if (mobileTarget) mobileObserver.observe(mobileTarget);

  // run desktop check and attach listeners
  checkOverlap();
  const rafId = requestAnimationFrame(checkOverlap);
  const timeoutId = setTimeout(checkOverlap, 200);
  window.addEventListener("scroll", checkOverlap, { passive: true });
  window.addEventListener("resize", checkOverlap);
  window.addEventListener("load", checkOverlap);

  return () => {
    mobileObserver.disconnect();
    cancelAnimationFrame(rafId);
    clearTimeout(timeoutId);
    window.removeEventListener("scroll", checkOverlap);
    window.removeEventListener("resize", checkOverlap);
    window.removeEventListener("load", checkOverlap);
  };
}, []);
// ...existing code...
  return (
   <motion.nav  
  ref={navRef} 
  
  // Animation de lancement
  initial={{ y: -100, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }} 
  transition={{ duration: 0.8, ease: "easeOut" }}

  // Garde tes styles existants
  style={{ 
    backgroundColor: isScrolled ? "white" : "transparent"
  }}
>
      <Link to="/" onClick={() => setOpen(false)}>
        <img src={logo1} alt="logo" className="logo" />
      </Link>
      <div className="langMob">
        <span
          onClick={() => changeLanguage("en")}
          className={currentLanguage === "en" ? "selected-language" : ""}
             style={{color: isScrolled2 ? "white" : "black" }}
        >
          EN
        </span>
        <span
          onClick={() => changeLanguage("fr")}
          className={currentLanguage === "fr" ? "selected-language" : ""}
             style={{color: isScrolled2 ? "white" : "black" }}
        >
          FR
        </span>
        <Menu color={isScrolled2 ? "white" : "black"} className="menu" onClick={() => setOpen(!open)} />
      </div>

      <ul className={open ? "open" : ""}>
        <div className="top-nav">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={logo1} alt="logo" />
          </Link>
          <div className="CLOSE">
            <IoClose onClick={() => setOpen(false)} />
          </div>
        </div>
        {links.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setOpen(false)}>
            <li style={{color: isScrolled2 ? "white" : "black" }}>{t(`navbar.${link.name}`)}</li>
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

      {/* DESKTOP RIGHT */}
      <div className="nav-infos">
        <div className="languages">
          <span
            onClick={() => changeLanguage("en")}
            className={currentLanguage === "en" ? "selected-language" : ""}
             style={{color: isScrolled2 ? "white" : "black" }}
          >
            EN
          </span>
          <span
            onClick={() => changeLanguage("fr")}
            className={currentLanguage === "fr" ? "selected-language" : ""}
             style={{color: isScrolled2 ? "white" : "black" }}
          >
            FR
          </span>
        </div>

        <Link to="/contact" className="contact-btn">
          {t("navbar.contact")}
        </Link>
      </div>
    </motion.nav  >
  );
}
