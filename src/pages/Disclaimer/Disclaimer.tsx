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

  const textKey = testId === "metabolic-health" ? "disclaimer.test1" : "disclaimer.test2";
  const TextSelection = t(textKey, { returnObjects: true }) || [];

  const durationPerText = 4.2;
  const totalDuration = TextSelection.length * durationPerText;
  const [seconds, setSeconds] = useState(Math.ceil(totalDuration));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current.querySelectorAll(".disc-paragraph");
      const circle = circleRef.current;
      const radius = 20;
      const circumference = 2 * Math.PI * radius;

      gsap.set(circle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        rotate: -90,
        transformOrigin: "center",
      });

      // Optimisation : On prépare le GPU pour les paragraphes
      gsap.set(paragraphs, { 
        willChange: "transform, opacity", 
        force3D: true, // Force le rendu matériel
        y: 20,
        opacity: 0
      });

      // Timer Décompte
      const timerObj = { value: totalDuration };
      gsap.to(timerObj, {
        value: 0,
        duration: totalDuration,
        ease: "none",
        onUpdate: () => setSeconds(Math.ceil(timerObj.value)),
      });

      // Cercle
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: totalDuration - 0.5,
        ease: "none",
      });

      // Timeline des Textes
      const tlTexts = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => navigate(`/tests/${testId}`),
          });
        },
      });

      paragraphs.forEach((p) => {
        tlTexts
          .to(p, {
            opacity: 1,
            // Réduction du blur ou suppression si ça shake encore trop
            filter: "blur(0px)", 
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          })
          .to(
            p,
            {
              opacity: 0,
              filter: "blur(10px)", // Un peu moins de blur pour soulager le CPU
              y: -15,
              duration: 1,
              ease: "power2.in",
            },
            `+=${durationPerText - 2.2}` // Calcul plus précis du timing
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [navigate, testId, totalDuration]);

  return (
    <div className="Disclaimer-container" ref={containerRef}>
      <div className="circle-wrapper">
        <span className="timer-number">
          <span className="timer-label">{t("disclaimer1.starts_in")}</span>{" "}
          {seconds}
        </span>
        <svg width="60" height="60" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="7" fill="none" />
          <circle
            ref={circleRef}
            cx="50" cy="50" r="20"
            stroke="rgba(255, 204, 0, 1)"
            strokeWidth="7" fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="Disclaimer-content">
        {TextSelection.map((text, index) => (
          <p key={index} className="disc-paragraph">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}