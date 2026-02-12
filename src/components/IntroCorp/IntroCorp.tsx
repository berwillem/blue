//@ts-nocheck
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../ui/button/Button";
import gsap from "gsap";
import "./IntroCorp.css";
import { Link } from "react-router-dom";

export default function IntroCorp() {
  const { t, i18n } = useTranslation();
  const h3Ref = useRef(null);
  const h1Ref1 = useRef(null); // Premier titre
  const h1Ref = useRef(null);  // Deuxième titre

  useEffect(() => {
    // Fonction pour transformer le texte en spans
    const splitText = (ref, translationKey) => {
      const text = t(translationKey);
      ref.current.innerHTML = text
        .split("")
        .map((char) => char === "\n" ? "<br/>" : `<span class="char">${char}</span>`)
        .join("");
    };

    // On prépare les deux titres
    splitText(h1Ref1, "intro.title1"); // Assure-toi d'avoir title1 dans ton JSON
    splitText(h1Ref, "intro.title");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Le sous-titre
    tl.fromTo(
      h3Ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    // 2. Premier titre (title1)
    tl.fromTo(
      h1Ref1.current.querySelectorAll(".char"),
      { y: 20, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.02,
      },
      "-=0.4"
    );

    // 3. Deuxième titre (title) - commence APRES le premier
    tl.fromTo(
      h1Ref.current.querySelectorAll(".char"),
      { y: 20, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.02,
      },
      "-=0.4" // Commence un peu avant la fin du précédent pour la fluidité
    );
    
  }, [t, i18n.language]);

  return (
    <div className="intro-corp">
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="intro-content">
        <div className="intro-text">
          <h3 ref={h3Ref}>{t("intro.subtitle")}</h3>
          <h1 ref={h1Ref1} className="title-first"></h1>
          <h1 ref={h1Ref} className="title-second"></h1>
        </div>
      </div>
      <div className="intro-bottom">
        <Link to={"/about"} className="intro-corp-btn">
          <Button text={t("intro.button")} width="100%" />
        </Link>
        <div className="scroll-indicator">
          <span />
        </div>
      </div>
    </div>
  );
}