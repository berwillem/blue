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
  const circleRef = useRef(null);
  const tlRef = useRef(null); // Ref pour stocker la timeline

  const textKey = testId === "metabolic-health" ? "disclaimer.test1" : "disclaimer.test2";
  const TextSelection = t(textKey, { returnObjects: true }) || [];

  const durationPerText = 4.2;
  const totalDuration = TextSelection.length * durationPerText;
  const [seconds, setSeconds] = useState(Math.ceil(totalDuration));

  // 1. Fonction pour aller à la phrase suivante
  const handleNext = () => {
    if (!tlRef.current) return;
    
    const currentTime = tlRef.current.time();
    // On calcule le début de la section suivante
    const nextStep = Math.ceil((currentTime + 0.1) / durationPerText) * durationPerText;

    if (nextStep >= totalDuration) {
      handleFinalSkip();
    } else {
      // Animation fluide vers le début de la phrase suivante
      gsap.to(tlRef.current, { time: nextStep, duration: 0.4, ease: "power2.inOut" });
    }
  };

  // 2. Fonction pour quitter définitivement
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
      const circle = circleRef.current;
      const radius = 20;
      const circumference = 2 * Math.PI * radius;

      gsap.set(paragraphs, { 
        opacity: 0, 
        y: 30, 
        filter: "blur(10px)",
        willChange: "transform, opacity, filter" 
      });

      gsap.set(circle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        rotate: -90,
        transformOrigin: "center",
      });

      // Création de la timeline principale
      const tl = gsap.timeline({
        onComplete: handleFinalSkip,
        onUpdate: () => {
          // Synchronisation du timer et du cercle avec la timeline
          const remaining = totalDuration - tl.time();
          setSeconds(Math.ceil(remaining));
          
          const progress = tl.progress();
          gsap.set(circle, { strokeDashoffset: circumference * (1 - progress) });
        }
      });

      tlRef.current = tl; // On sauvegarde la timeline dans la ref

      // Ajout des animations de texte à la timeline
      paragraphs.forEach((p, index) => {
        const startTime = index * durationPerText;
        tl.to(p, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        }, startTime)
        .to(p, {
          opacity: 0,
          filter: "blur(10px)",
          y: -30,
          duration: 1,
          ease: "power2.in",
        }, startTime + (durationPerText - 1));
      });

      // Apparition du bouton
      gsap.fromTo(".skip-button", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [navigate, testId, totalDuration]);

  return (
    <div className="Disclaimer-container" ref={containerRef}>


      <div className="Disclaimer-content">
        {TextSelection.map((text, index) => (
          <p key={index} className="disc-paragraph">
            {text}
          </p>
        ))}
      </div>

      {/* CHANGÉ EN BOUTON NEXT */}
      <button className="skip-button" onClick={handleNext}>
        {t("disclaimer1.next") || "Next"} <span className="skip-arrow">→</span>
      </button>
    </div>
  );
}