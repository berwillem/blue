//@ts-nocheck
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../ui/button/Button";
import gsap from "gsap";
import "./IntroCorp.css";

export default function IntroCorp() {
  const { t, i18n } = useTranslation();
  const h3Ref = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    // On divise le texte traduit en spans pour l'animation
    const text = t("intro.title");
    const h1Chars = text.split("").map((char) => {
      // Préserve les sauts de ligne si présents dans la traduction
      if (char === "\n") return "<br/>";
      return `<span class="char">${char}</span>`;
    });
    
    h1Ref.current.innerHTML = h1Chars.join("");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      h3Ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
    );

    tl.fromTo(
      ".char",
      { y: 20, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.03,
      },
      "-=0.5",
    );
  }, [t, i18n.language]); // Se relance si la langue change

  return (
    <div className="intro-corp">
      <div className="intro-content">
        <div className="intro-text">
          <h3 ref={h3Ref}>{t("intro.subtitle")}</h3>
          <h1 ref={h1Ref}>
            {/* Le contenu est injecté via innerHTML dans useEffect */}
          </h1>
        </div>
      </div>
      <div className="intro-bottom">
        <Button text={t("intro.button")} width="100%" />
        <div className="scroll-indicator">
          <span />
        </div>
      </div>
    </div>
  );
}