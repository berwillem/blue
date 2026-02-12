// @ts-nocheck
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/redaabout.png";
import "./Intro.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const whyRef = useRef(null);
  const { t, i18n } = useTranslation();

  // Helper pour splitter le texte proprement
  const renderSplitText = (textKey, className) => {
    return t(textKey)
      .split(" ")
      .map((word, i) => (
        <span key={i} className={className}>
          {word}&nbsp;
        </span>
      ));
  };

  useLayoutEffect(() => {
    // Nettoyage complet pour le changement de langue
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const titleWords = textRef.current?.querySelectorAll(".word");
      const revealWords = whyRef.current?.querySelectorAll(".revealWord");

      // --- 1. ÉTATS INITIAUX (Tout est caché) ---
      gsap.set(imageRef.current, {
        position: "absolute",
        bottom: "0%",
        opacity: 0,
        left: "50%",
        xPercent: -50,
        width: "90vw",
        height: "50vh",
        borderRadius: "40px 40px 0 0",
        zIndex: 5,
      });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      gsap.set(whyRef.current, { y: "100%" });

      if (titleWords) {
        gsap.set(titleWords, { opacity: 0, y: 30, filter: "blur(15px)" });
      }
      if (revealWords) {
        gsap.set(revealWords, { opacity: 0.15 });
      }

      // --- 2. ANIMATION D'ENTRÉE (Déclenchée AU SCROLL) ---
      // Cette timeline ne se joue que quand on arrive à la section
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Se lance quand le haut de la section touche 80% de l'écran
          once: true, // Ne se joue qu'une seule fois
        },
        defaults: { ease: "power4.out" },
      });

      entryTl.to(imageRef.current, { opacity: 1, duration: 1.2 }).to(
        titleWords,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.02,
          duration: 1,
        },
        "-=0.8",
      );

      // --- 3. TIMELINE PRINCIPALE (SCRUB) ---
      // C'est l'animation qui suit le mouvement du doigt/souris
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      mainTl
        .to(textRef.current, {
          opacity: 0,
          y: -50,
          filter: "blur(10px)",
          duration: 1,
        })
        .to(
          imageRef.current,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            bottom: 0,
            duration: 1,
          },
          "<",
        )
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<0.2")
        .to(whyRef.current, { y: "0%", duration: 1 }, "+=0.2")
        .to(revealWords, { opacity: 1, stagger: 0.02, duration: 0.5 }, "<0.5");
    }, containerRef);

    // Recalcule les positions après un court instant
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [t, i18n.language]);

  return (
    <section ref={containerRef} className="hero-container">
      <div className="intro-section">
        <h1 ref={textRef} className="headline" key={`h1-${i18n.language}`}>
          {renderSplitText("individuals.main_title", "word")}
          <br />
        </h1>

        <div ref={imageRef} className="imageCard">
          <img src={heroImage} alt="Intro" />
        </div>

        <div ref={buttonRef} className="btn-wrapper">
          <Link to="/about">
            <button className="founderBtn">
              <div className="yellow" />
              {t("individuals.button")}
            </button>
          </Link>
        </div>
      </div>

      <section
        ref={whyRef}
        className="why-overlay"
        key={`why-${i18n.language}`}
      >
        <span className="smallTitle">{t("individuals.why")}</span>
        <div className="longText">
          <p>{renderSplitText("individuals.whyp1", "revealWord")}</p>
          <p>{renderSplitText("individuals.whyp2", "revealWord")}</p>
          <p>{renderSplitText("individuals.whyp3", "revealWord")}</p>
        </div>
      </section>
    </section>
  );
}
