// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Disclaimer.css";
import { useTranslation } from "react-i18next";

export default function Disclaimer() {
  const { testId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  // On commence à 0 (le premier texte)
  const [currentIndex, setCurrentIndex] = useState(0);

  const textKey = testId === "metabolic-health" ? "disclaimer.test2" : "disclaimer.test";
  const TextSelection = t(textKey, { returnObjects: true }) || [];

  const handleNext = () => {
    const paragraphs = containerRef.current.querySelectorAll(".disc-paragraph");
    
    // Si on est à la fin, on quitte
    if (currentIndex >= TextSelection.length - 1) {
      handleFinalSkip();
      return;
    }

    const nextIndex = currentIndex + 1;

    // 1. On fait sortir le texte actuel (Flou + Montée)
    gsap.to(paragraphs[currentIndex], {
      opacity: 0,
      y: -30,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power2.in"
    });

    // 2. On fait entrer le texte suivant (Flou vers Net + Montée)
    gsap.to(paragraphs[nextIndex], {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    });

    setCurrentIndex(nextIndex);
  };

  const handleFinalSkip = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => navigate(`/tests/${testId}`),
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current.querySelectorAll(".disc-paragraph");

      // On cache TOUT au début
      gsap.set(paragraphs, { 
        opacity: 0, 
        y: 30, 
        filter: "blur(10px)",
      });

      // ON JOUE LE PREMIER TEXTE AUTOMATIQUEMENT AU CHARGEMENT
      gsap.to(paragraphs[0], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      });

      // Bouton visible
      gsap.set(".skip-button", { opacity: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [testId]);

  return (
    <div className="Disclaimer-container" ref={containerRef}>
      <div className="Disclaimer-content">
        {TextSelection.map((text, index) => (
          <p key={index} className="disc-paragraph">
            {text}
          </p>
        ))}
      </div>

      <button className="skip-button" onClick={handleNext}>
        {t("disclaimer1.next") || "Next"} <span className="skip-arrow">→</span>
      </button>
    </div>
  );
}