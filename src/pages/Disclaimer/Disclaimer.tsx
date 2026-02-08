// @ts-nocheck
import { useEffect, useRef } from "react";
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
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current.querySelectorAll(".disc-paragraph");
      const circle = circleRef.current;
      const circumference = 2 * Math.PI * 45;

      // Reset du cercle
      gsap.set(circle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        rotate: -90,
        transformOrigin: "center",
      });

      // --- TIMELINE 1 : LE CERCLE (Timer global) ---
      const totalTime = (1.2 + 2 + 1) * TextSelection.length;
      
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: totalTime,
        ease: "none"
      });

      // --- TIMELINE 2 : LES TEXTES (Séquence) ---
      const tlTexts = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            navigate(`/tests/${testId}`);
          }, 1000);
        }
      });

      paragraphs.forEach((p) => {
        tlTexts.to(p, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(p, {
          opacity: 0,
          filter: "blur(15px)",
          y: -20,
          duration: 1,
          ease: "power3.in",
        }, "+=2"); // Pause de 2s
      });

    }, containerRef);

    return () => ctx.revert();
  }, [navigate, testId]);

  return (
    <div className="Disclaimer-container" ref={containerRef}>
      <div className="circle">
        <svg width="60" height="60" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="10" fill="none" />
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="30"
            stroke="#ffffff"
            strokeWidth="10"
            fill="none"
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