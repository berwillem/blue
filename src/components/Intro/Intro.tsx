import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Intro.css";
import placeholder from "../../assets/images/redaplaceholder.png";
import Button from "../../ui/button/Button";
import BlurText from "../../ui/BlurText";

export default function Intro() {
  const [isPC, setIsPC] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Détection du device
  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth > 1280);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // On suit le scroll sur toute la section Intro
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- ANIMATIONS LIÉES AU SCROLL ---
  
  // 1. L'image (Agrandissement)
  const width = useTransform(scrollYProgress, [0, 0.2], isPC ? ["80%", "100%"] : ["100%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.2], isPC ? ["70vh", "100dvh"] : ["auto", "auto"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.2], isPC ? ["2rem", "0rem"] : ["2rem", "2rem"]);
  
  // 2. Le texte principal (Disparition progressive)
  const opacityText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // 3. Le bouton de la Part 1 (Disparition rapide dès le début du scroll)


  return (
    <div className="intro-container" ref={containerRef}>
      {/* PARTIE 1 : L'accroche et l'image principale */}
      <div className="part1">
        
        <motion.div
          className="scroll-btn"
          style={{ 
           
           
            zIndex: 50 
          }}
          initial={{ opacity: 0, y: 50 ,x: "-50%"}}
          animate={{ opacity: 1, y: -50 ,x: "-50%"}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button width="auto" text="About the founder" />
        </motion.div>

        <motion.div
          className="img-wrapper"
          style={{
            width: isPC ? width : "100%",
            height: isPC ? height : "auto",
            borderRadius: isPC ? borderRadius : "2rem",
            overflow: "hidden",
          }}
        >
          <img src={placeholder} alt="placeholder" className="main-img" />
        </motion.div>

        <motion.div style={{ opacity: opacityText }} className="intro-h2-wrapper">
          <BlurText
            text="I conduct Blu to help people rebuild themselves—physically, mentally, and morally—so they can live with strength, purpose, and responsibility instead of exhaustion and confusion"
            delay={50}
            animateBy="words"
            direction="bottom"
            className="intro-title"
          />
        </motion.div>
      </div>

      {/* PARTIE 2 : La suite après le scroll (optionnelle selon ton design) */}
      <div className="part2">
        <img src={placeholder} alt="placeholder" className="img-scroll" />
        {/* On peut garder un bouton fixe ici ou un bouton qui apparaît seulement à la fin */}
        <div className="scroll-btn-fixed">
           <Button width="auto" text="About the founder" />
        </div>
      </div>
    </div>
  );
}