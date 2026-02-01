import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "./Intro.css";
import redaintro from "../../assets/images/redaintro.jpg";
import Button from "../../ui/button/Button";
import BlurText from "../../ui/BlurText";
import { Link } from "react-router";

export default function Intro() {
  const [isPC, setIsPC] = useState(false);
  const [isFull, setIsFull] = useState(false); // État pour l'animation "On/Off"
  const containerRef = useRef<HTMLDivElement>(null);

  const introText = "I conduct Blu to help people rebuild themselves—physically, mentally, and morally—so they can live with strength, purpose, and responsibility instead of exhaustion and confusion";

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

  // --- LE DÉCLENCHEUR (TRIGGER) ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isPC) {
      // Si on scroll plus de 10% (0.1), on active le plein écran
      if (latest > 0.1) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    }
  });

  return (
    <div className="intro-container" ref={containerRef}>
      <div className="part1">
        <motion.div
          className="scroll-btn"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ 
            opacity: !isPC ? 0 : 1, // Disparaît quand l'image prend tout l'écran
            y:  -50, 
            x: "-50%" 
          }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/about">
            <Button width="auto" text="About the founder" />
          </Link>
        </motion.div>

        <motion.div
          className="img-wrapper"
          animate={{
            // On utilise l'état isFull pour définir les valeurs directes
            width: isPC ? (isFull ? "100%" : "80%") : "100%",
            height: isPC ? (isFull ? "100dvh" : "70vh") : "auto",
            borderRadius: isPC ? (isFull ? "0rem" : "2rem") : "2rem",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20, // Effet rebond pour le "snap"
            duration: 0.5 
          }}
          style={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.img
            src={redaintro}
            alt="redaintro"
            className="main-img"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        <motion.div
          animate={{ opacity:isPC ? isFull ? 0 : 1:1, y: isFull ? 20 : 0 }}
          className="intro-h2-wrapper"
        >
          <BlurText
            text={introText}
            delay={80}
            animateBy="words"
            direction="bottom"
            className="intro-title"
          />
        </motion.div>
      </div>

      <div className="part2">
        <img src={redaintro} alt="redaintro" className="img-scroll" />
        <div className="scroll-btn-fixed">
      
            <Button width="auto" text="About the founder" />
         
        </div>
      </div>
    </div>
  );
}