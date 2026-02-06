// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import gsap from "gsap";
import Splitting from "splitting";
import styles from "./Home.module.css";
import TransitionOverlay from "../../components/TransitionOverlay/TransitionOverlay";
import { useUserTypeStore } from "../../store/useUserTypeStore";
// Import du store
 // Ajuste le chemin selon ton projet

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Récupération de la fonction de mise à jour du store
  const setUserType = useUserTypeStore((state) => state.setUserType);

  const [transition, setTransition] = useState({
    active: false,
    x: 0,
    y: 0,
    targetPath: "",
  });

  useEffect(() => {
    Splitting({
      target: [
        ".quote",
        ".individuals-title",
        ".individuals-subtitle",
        ".corporate-title",
        ".corporate-subtitle",
      ],
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".quote",
      { opacity: 0, filter: "blur(12px)", y: 10 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2 },
    );

    tl.to(
      ".quote",
      { opacity: 0, filter: "blur(12px)", y: -10, duration: 0.8 },
      "+=0.8",
    );

    tl.fromTo(
      ".individuals-title .char, .individuals-subtitle .char, .corporate-title .char, .corporate-subtitle .char",
      { opacity: 0, filter: "blur(12px)", y: 12 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.3,
        stagger: 0.035,
      },
    );
  }, [i18n.language]);

  const handleClick = (e, path) => {
    const x = e.clientX;
    const y = e.clientY;

    // --- MISE À JOUR DU STORE ---
    // On déduit le type du path (ex: "/individuals" -> "individuals")
    const selectedType = path.replace("/", ""); 
    setUserType(selectedType);

    setTransition({
      active: true,
      x,
      y,
      targetPath: path,
    });
  };

  const handleTransitionComplete = () => {
    navigate(transition.targetPath);
  };

  return (
    <>
      <div className={styles.splitContainer}>
        <Link to="/" className={`${styles.home_logo}`}>
          <div className={`${styles.logo}`}>
            Blu<span>.</span>
          </div>
        </Link>

        {/* Gauche: Individuals */}
        <div
          className={styles.side}
          style={{ backgroundColor: "white" }}
          onClick={(e) => handleClick(e, "/individuals")}
        >
          <div className={styles.content}>
            <p className={`${styles.quote} ${styles.corporateQuote} quote`}>
              {t("home.individuals.quote")}
            </p>
            <h1 className={`${styles.title} individuals-title`}>
              {t("home.individuals.title")}
            </h1>
            <p className={`${styles.subtitle} individuals-subtitle`}>
              <Trans i18nKey="home.individuals.subtitle">
                Coaching <span className={styles.and}>and</span> Mentoring
              </Trans>
            </p>
          </div>
        </div>

        {/* Droite: Corporates */}
        <div
          className={styles.side}
          style={{ background: "linear-gradient(to top, #00296F, #001D4F)" }}
          onClick={(e) => handleClick(e, "/corporates")}
        >
          <div className={styles.content}>
            <p className={`${styles.quote} ${styles.individualsQuote} quote`}>
              {t("home.corporates.quote")}
            </p>
            <h1 className={`${styles.title} corporate-title`}>
              {t("home.corporates.title")}
            </h1>
            <p className={`${styles.subtitle} corporate-subtitle`}>
              <Trans i18nKey="home.corporates.subtitle">
                Consulting <span className={styles.and}>and</span> Advice
              </Trans>
            </p>
          </div>
        </div>
      </div>

      <TransitionOverlay
        isActive={transition.active}
        clickX={transition.x}
        clickY={transition.y}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}