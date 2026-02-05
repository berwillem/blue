// @ts-nocheck
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/redaabout.png";
import "./Intro.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const whyRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !imageRef.current || !buttonRef.current || !whyRef.current || !textRef.current) return;

      // --- ÉTATS INITIAUX ---
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

      // Mots du titre cachés au départ
      const titleWords = textRef.current.querySelectorAll(".word");
      gsap.set(titleWords, { opacity: 0, filter: "blur(15px)", y: 30 });

      // SPLIT WORDS (Why overlay)
      const paragraphs = whyRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (p.dataset.split) return;
        p.dataset.split = "true";
        const words = p.innerText.split(" ");
        p.innerHTML = words.map((w) => `<span class="revealWord">${w}&nbsp;</span>`).join("");
      });

      // --- 1. ANIMATION D'ENTRÉE (Déclenchée une fois au scroll) ---
      const entryTl = gsap.timeline({ 
        paused: true, // On la met en pause au départ
        defaults: { ease: "power4.out" } 
      });

      entryTl
        .to(imageRef.current, { opacity: 1, duration: 1.2 })
        .to(titleWords, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.02,
          duration: 1,
        }, "-=0.8");

      // ScrollTrigger pour lancer l'animation d'entrée
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%", // Se lance quand la section est à 80% de l'écran
        onEnter: () => entryTl.play(), // Joue l'animation une seule fois
        once: true // L'animation ne se réinitialise pas
      });

      // --- 2. TIMELINE DE DISPARITION (Liée au Scroll Pur) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // On commence la disparition (le h1 s'efface quand on scroll vraiment)
      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        filter: "blur(10px)",
        duration: 1,
      })
      .to(imageRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        bottom: 0,
        duration: 1,
      }, "<")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "<0.2")
      .to(whyRef.current, { y: "0%", duration: 1 }, "+=0.2")
      .to(".revealWord", {
        opacity: 1,
        stagger: 0.02,
        duration: 0.5,
      }, "<0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-container">
      <div className="intro-section">
        <h1 ref={textRef} className="headline">
          {t("individuals.main_title").split(" ").map((word, i) => (
            <span key={i} className="word">
              {word}&nbsp;
            </span>
          ))}
        </h1>

        <div ref={imageRef} className="imageCard">
          <img src={heroImage} alt="Reda" />
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

      <section ref={whyRef} className="why-overlay">
        <span className="smallTitle">{t("individuals.why")}</span>
        <div className="longText">
          <p>{t("individuals.whyp1")}</p>
          <p>{t("individuals.whyp2")}</p>
          <p>{t("individuals.whyp3")}</p>
        </div>
      </section>
    </section>
  );
}