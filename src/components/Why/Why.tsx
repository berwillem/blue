import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import "./Why.css";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isPC: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, isPC }) => {
  // Animation d'opacité. Sur mobile, on reste à 1.
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span style={{ position: "relative", display: "inline-block", marginRight: "0.25em" }}>
      <motion.span style={{ opacity: isPC ? opacity : 1 }}>
        {children}
      </motion.span>
    </span>
  );
};

export default function Why() {
  const [isPC, setIsPC] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth > 1280);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const paragraphs = [
    "Avec plus de 21 ans d’expérience dans des environnements exigeants — dont 15 années à des postes de responsabilités — Redha a longtemps évolué à haut niveau tout en faisant face à des difficultés personnelles bien réelles.",
    "En parcourant son propre chemin de transformation, il a progressivement retrouvé une énergie durable, une clarté d’esprit profonde et une discipline plus stable et alignée.",
    "Aujourd’hui, il met cette expérience vécue au service des personnes qui souhaitent se reconnecter à elles-mêmes, retrouver leur vitalité, renforcer leur mental et avancer avec plus de sens et de cohérence dans leur vie."
  ];

  return (
    <div className="why-scroll-wrapper" ref={containerRef}>
      <div className="why-container">
        <motion.h2>Why?</motion.h2>

        {paragraphs.map((text, pIndex) => {
          const words = text.split(" ");
          
          // Définition de la zone de scroll pour chaque paragraphe (0-33%, 33-66%, 66-100%)
          const pStart = pIndex / paragraphs.length;
          const pEnd = (pIndex + 1) / paragraphs.length;

          return (
            <div key={pIndex} className="animated-paragraph">
              {words.map((word, wIndex) => {
                // Calcul de la plage d'apparition de chaque mot à l'intérieur de la zone du paragraphe
                const wordWeight = (pEnd - pStart) / words.length;
                const wStart = pStart + (wIndex * wordWeight);
                const wEnd = pStart + ((wIndex + 1) * wordWeight);

                return (
                  <Word 
                    key={wIndex} 
                    progress={scrollYProgress} 
                    range={[wStart, wEnd]} 
                    isPC={isPC}
                  >
                    {word}
                  </Word>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}