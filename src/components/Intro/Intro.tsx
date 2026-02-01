import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Intro.css";
import redaintro from "../../assets/images/redaintro.jpg";
import Button from "../../ui/button/Button";
import BlurText from "../../ui/BlurText";
import { Link } from "react-router";

export default function Intro() {
  const [isPC, setIsPC] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Count words in text to sync animation
  const introText =
    "I conduct Blu to help people rebuild themselves—physically, mentally, and morally—so they can live with strength, purpose, and responsibility instead of exhaustion and confusion";
  const textWords = introText.split(" ");
  const textWordCount = textWords.length;

  // --- Detect device ---
  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth > 1280);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // --- Scroll transforms ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? ["80%", "100%"] : ["100%", "100%"],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? ["70vh", "100dvh"] : ["auto", "auto"],
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? ["2rem", "0rem"] : ["2rem", "2rem"],
  );
  const opacityText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // --- Duration sync ---
  const stepDuration = 0.7;
  const delayPerWord = 0.07;
  const imageDuration = stepDuration + textWordCount * delayPerWord;

  return (
    <div className="intro-container" ref={containerRef}>
      <div className="part1">
        <motion.div
          className="scroll-btn"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: -50, x: "-50%" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/about">
            <Button width="auto" text="About the founder" />
          </Link>
        </motion.div>

        <motion.div
          className="img-wrapper"
          style={{
            width: isPC ? width : "100%",
            height: isPC ? height : "auto",
            borderRadius: isPC ? borderRadius : "2rem",
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
            initial={{ opacity: 0, y: 20, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: imageDuration,
              ease: [0.42, 0, 0.58, 1],
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: opacityText }}
          className="intro-h2-wrapper"
        >
          <BlurText
            text={introText}
            delay={80}
            stepDuration={stepDuration}
            animateBy="words"
            direction="bottom"
            className="intro-title"
            easing={(t) => t * t * (3 - 2 * t)}
          />
        </motion.div>
      </div>

      {/* Part 2 */}
      <div className="part2">
        <img src={redaintro} alt="redaintro" className="img-scroll" />
        <div className="scroll-btn-fixed">
          <Link to="/about">
            <Button width="auto" text="About the founder" />
          </Link>
        </div>
      </div>
    </div>
  );
}
