import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "./Intro.css";
import redaintro from "../../assets/images/redaintro.jpg";
import Button from "../../ui/button/Button";
import BlurText from "../../ui/BlurText";
import { Link } from "react-router";

export default function Intro() {
  const [isPC, setIsPC] = useState(false);
  const [isFull, setIsFull] = useState(false);
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isPC) {
      // On déclenche l'agrandissement très tôt pour éviter les entre-deux
      setIsFull(latest > 0.2);
    }
  });

  return (
    <div className="intro-container" ref={containerRef}>
      <div className="part1" style={{marginTop:isPC && isFull ? 0 : "100px",paddingTop: isFull ? 0 : "100px"}}>
        <motion.div
          className="scroll-btn"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ 
            opacity: !isPC ? 0 : 1, // On cache quand c'est plein écran
            y:  -50, 
            x: "-50%" 
          }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/about">
            <Button width="auto" text="About the founder" />
          </Link>
        </motion.div>

        <motion.div
          className="img-wrapper"
          animate={{
            // On utilise vw et vh pour garantir le remplissage TOTAL de l'écran
            width: isPC ? (isFull ? "100vw" : "80vw") : "100%",
            height: isPC ? (isFull ? "100vh" : "70vh") : "auto",
            borderRadius: isPC ? (isFull ? "0rem" : "2rem") : "2rem",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 25 
          }}
          style={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3
          }}
        >
          <motion.img
            src={redaintro}
            alt="redaintro"
            className="main-img"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              scale: isFull ? 1.05 : 1 // Léger zoom pour remplir parfaitement
            }}
          />
        </motion.div>

        <motion.div
          animate={{ 
            height: isPC ? (isFull ? "0vh" : "30vh") : "auto",
            opacity: isPC ? (isFull ? 0 : 1) : 1, 
            y: isFull ? 40 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="intro-h2-wrapper"
          style={{ zIndex: 45 }}
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