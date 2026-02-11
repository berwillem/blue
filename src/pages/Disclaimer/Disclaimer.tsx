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

  // Fonction pour passer l'intro
  const handleSkip = () => {
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
      const skipBtn = containerRef.current.querySelector(".skip-button");
      const radius = 20;
      const circumference = 2 * Math.PI * radius;

      gsap.set(paragraphs, { 
        opacity: 0, 
        y: 30, 
        filter: "blur(10px)",
        willChange: "transform, opacity, filter" 
      });

      // On fait apparaître le bouton skip en douceur
      gsap.fromTo(skipBtn, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });

      gsap.set(circle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        rotate: -90,
        transformOrigin: "center",
      });

      const timerObj = { value: totalDuration };
      gsap.to(timerObj, {
        value: 0,
        duration: totalDuration,
        ease: "none",
        onUpdate: () => setSeconds(Math.ceil(timerObj.value)),
      });

      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: totalDuration,
        ease: "none",
      });

      const tlTexts = gsap.timeline({
        onComplete: handleSkip, // Utilise la même fonction à la fin
      });

      paragraphs.forEach((p, index) => {
        const startTime = index * durationPerText;
        tlTexts
          .to(p, {
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
            stroke="#ffcc00"
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

      {/* BOUTON SKIP */}
      <button className="skip-button" onClick={handleSkip}>
        {t("disclaimer1.skip")} <span className="skip-arrow">→</span>
      </button>
    </div>
  );
}