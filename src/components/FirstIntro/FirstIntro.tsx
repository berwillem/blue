// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import "./FirstIntro.css"
import card1 from "../../assets/images/card1.png"
export default function FirstIntro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      // On récupère tous les spans avec la classe .word
      const words = textRef.current.querySelectorAll('.word');

      // L'animation "entryTl" exacte de ton exemple
      gsap.from(words, {
        opacity: 0,
        filter: "blur(15px)",
        y: 30,
        duration: 1.2,
        stagger: 0.02, // Effet de cascade rapide
        ease: "power4.out",
        delay: 0.3, // Petit délai au chargement
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="intro-full-wrapper ">
      <div className="intro-section first-intro">
        <h1 ref={textRef} className="headline">
          {t("individuals.main_title")
            .split(" ")
            .map((word, i) => (
              <span key={i} className="word">
                {word}&nbsp;
              </span>
            ))}
        </h1>
        <div className="grid_intro">
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
            <div className="card-intro">
                <img src={card1} alt="card" />
                <h2>Cardiovascular disease</h2>
            </div>
        </div>
      </div>
    </div>
  );
}