// @ts-nocheck
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Splitting from "splitting";
import styles from "./Home.module.css";
import TransitionOverlay from "../../components/TransitionOverlay/TransitionOverlay"; // use alias @ = src/ if configured, or adjust path

export default function Home() {
  const navigate = useNavigate();

  const [transition, setTransition] = useState({
    active: false,
    x: 0,
    y: 0,
    targetPath: "",
  });

  useEffect(() => {
    Splitting({
      target: [
        ".quote",
        ".individuals-title",
        ".individuals-subtitle",
        ".corporate-title",
        ".corporate-subtitle",
      ],
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1️⃣ QUOTES IN (both sides together)
    tl.fromTo(
      ".quote",
      { opacity: 0, filter: "blur(12px)", y: 10 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2 },
    );

    // 2️⃣ QUOTES OUT
    tl.to(
      ".quote",
      {
        opacity: 0,
        filter: "blur(12px)",
        y: -10,
        duration: 0.8,
      },
      "+=0.8",
    );

    // 3️⃣ MAIN TEXTS (your original animation, untouched)
    tl.fromTo(
      ".individuals-title .char, .individuals-subtitle .char, .corporate-title .char, .corporate-subtitle .char",
      { opacity: 0, filter: "blur(12px)", y: 12 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.3,
        stagger: 0.035,
      },
    );
  }, []);

  const handleClick = (e, path) => {
    const x = e.clientX;
    const y = e.clientY;

    setTransition({
      active: true,
      x,
      y,
      targetPath: path,
    });
  };

  const handleTransitionComplete = () => {
    // Navigate while the yellow overlay is still fully covering the screen
    navigate(transition.targetPath);
    // Do NOT reset transition.active → overlay stays big on the next page
  };

  return (
    <>
      <div className={styles.splitContainer}>
        {/* Left: Individuals */}
        <div
          className={styles.side}
          style={{ backgroundColor: "white" }}
          onClick={(e) => handleClick(e, "/individuals")}
        >
          <div className={styles.content}>
            {/* QUOTE */}
            <p className={`${styles.quote} ${styles.corporateQuote} quote`}>
              “love yourself.”
            </p>

            {/* REAL TEXT */}
            <h1 className={`${styles.title} individuals-title`}>Individuals</h1>
            <p className={`${styles.subtitle} individuals-subtitle`}>
              Coaching <span className={styles.and}>and</span> Mentoring
            </p>
          </div>
        </div>
        {/* Right: Corporates */}
        <div
          className={styles.side}
          style={{ background: "linear-gradient(to top, #00296F, #001D4F)" }}
          onClick={(e) => handleClick(e, "/corporates")}
        >
          <div className={styles.content}>
            {/* QUOTE */}
            <p className={`${styles.quote} ${styles.individualsQuote} quote`}>
              “you can do it.”
            </p>

            {/* REAL TEXT */}
            <h1 className={`${styles.title} corporate-title`}>Corporates</h1>
            <p className={`${styles.subtitle} corporate-subtitle`}>
              Consulting <span className={styles.and}>and</span> Advice
            </p>
          </div>
        </div>
      </div>

      {/* Persistent overlay */}
      <TransitionOverlay
        isActive={transition.active}
        clickX={transition.x}
        clickY={transition.y}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
