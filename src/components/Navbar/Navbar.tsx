import "./Navbar.css";
import logo1 from "../../assets/images/logo1.png";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  const userType = useUserTypeStore((state) => state.userType);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsScrolled(true);
        } else {
          if (entry.boundingClientRect.top > 0) {
            setIsScrolled(false);
          }
        }
      },
      { threshold: 0.9 },
    );

    const secondSection = document.querySelector(".why-container");
    if (secondSection) observer.observe(secondSection);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      style={{ backgroundColor: isScrolled ? "white" : "transparent" }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
    >
      <img src={logo1} alt="logo" />

      <Menu color="black" className="menu" onClick={() => setOpen(!open)} />

      <ul className={open ? "open" : ""}>
        <div className="top-nav">
          <img src={logo1} alt="logo" />
          <div className="CLOSE">
            <IoClose onClick={() => setOpen(false)} />
          </div>
        </div>

        <Link to={`/${userType}`}>
          <li>{t("navbar.home")}</li>
        </Link>

        <Link to="/about">
          <li>{t("navbar.about")}</li>
        </Link>

        <Link to="#">
          <li>{t("navbar.why_us")}</li>
        </Link>

        <Link to="#">
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
          <Link to="/contact" className="contact-btn">
            {t("navbar.contact")}
          </Link>
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
        <Link to="/contact" className="contact-btn">
          {t("navbar.contact")}
        </Link>
      </div>
    </motion.nav>
  );
}
