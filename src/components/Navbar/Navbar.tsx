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

  // 🔥 Scroll observer
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

    const target = document.querySelector(".why-container");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      style={{ backgroundColor: isScrolled ? "white" : "transparent" }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
    >
      {/* LEFT / LOGO */}
      <Link to="/" onClick={() => setOpen(false)}>
        <img src={logo1} alt="logo" className="logo" />
      </Link>

      {/* MOBILE RIGHT */}
      <div className="langMob">
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
        <Menu className="menu" onClick={() => setOpen(true)} />
      </div>

      {/* MOBILE MENU */}
      <ul className={open ? "open" : ""}>
        <div className="top-nav">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={logo1} alt="logo" />
          </Link>
          <IoClose onClick={() => setOpen(false)} />
        </div>

        <Link to="/" onClick={() => setOpen(false)}>
          <li>{t("navbar.home")}</li>
        </Link>

        <Link to="/about" onClick={() => setOpen(false)}>
          <li>{t("navbar.about")}</li>
        </Link>

        <Link to="#" onClick={() => setOpen(false)}>
          <li>{t("navbar.why_us")}</li>
        </Link>

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
