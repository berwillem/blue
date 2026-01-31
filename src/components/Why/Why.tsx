import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import "./Why.css";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isPC: boolean; // Ajout de la prop ici
}

const Word: React.FC<WordProps> = ({ children, progress, range, isPC }) => {
  // On calcule l'animation
  const opacityTransform = useTransform(progress, range, [0.2, 1]);

  // Si on n'est pas sur PC, on retourne un span normal sans animation (opacité 1)
  if (!isPC) {
    return <span className="word-wrapper" style={{ opacity: 1 }}>{children}</span>;
  }

  return (
    <span className="word-wrapper">
      <motion.span style={{ opacity: opacityTransform }}>{children}</motion.span>
    </span>
  );
};

interface AnimatedParagraphProps {
  children: string;
  startOffset: string;
  endOffset: string;
  isPC: boolean;
}

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  children,
  startOffset,
  endOffset,
  isPC,
}) => {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: [startOffset, endOffset],
  });

  const words = children.split(" ");

  return (
    <p ref={container} className="reveal-text">
      {words.map((word, i) => {
        // Calcul des paliers pour l'animation séquentielle des mots
        const start = i / words.length;
        const end = (i + 1) / words.length;

        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]} 
            isPC={isPC}
          >
            {word + " "}
          </Word>
        );
      })}
    </p>
  );
};

export default function Why() {
  const [isPC, setIsPC] = useState<boolean>(false);

  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth > 1280);
    checkDevice(); // Initial check

    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div className="why-container">
      <motion.h2
        initial={{ opacity: 0.2 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Why?
      </motion.h2>

      <AnimatedParagraph
        isPC={isPC}
        startOffset="start 0.8"
        endOffset="start 0.6"
      >
        Avec plus de 21 ans d’expérience dans des environnements exigeants —
        dont 15 années à des postes de responsabilités — Redha a longtemps
        évolué à haut niveau tout en faisant face à des difficultés personnelles
        bien réelles.
      </AnimatedParagraph>

      <AnimatedParagraph
        isPC={isPC}
        startOffset="start 0.6"
        endOffset="start 0.4"
      >
        En parcourant son propre chemin de transformation, il a progressivement
        retrouvé une énergie durable, une clarté d’esprit profonde et une
        discipline plus stable et alignée.
      </AnimatedParagraph>

      <AnimatedParagraph
        isPC={isPC}
        startOffset="start 0.4"
        endOffset="start 0.2"
      >
        Aujourd’hui, il met cette expérience vécue au service des personnes qui
        souhaitent se reconnecter à elles-mêmes, retrouver leur vitalité,
        renforcer leur mental et avancer avec plus de sens et de cohérence dans
        leur vie.
      </AnimatedParagraph>
    </div>
  );
}