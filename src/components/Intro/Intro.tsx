import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/redacontent1.png";
import redaintro from "../../assets/images/redaintro.jpg";
import Button from "../../ui/button/Button";
import BlurText from "../../ui/BlurText";
import { Link } from "react-router-dom";
import "./Intro.css";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const whyRef = useRef(null);

  const headlineText = "I conduct Blu to help people rebuild themselves—physically, mentally, and morally—so they can live with strength, purpose, and responsibility instead of exhaustion and confusion";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ÉTATS INITIAUX
      gsap.set(imageRef.current, {
        position: "absolute",
        bottom: "0%",
        left: "50%",
        xPercent: -50,
        width: "90vw",
        height: "50%",
        borderRadius: "40px 40px 0 0",
        zIndex: 5,
      });

      // On cache la section Why tout en bas
      gsap.set(whyRef.current, { y: "100%" });

      // Split text pour le Why
      const paragraphs = whyRef.current.querySelectorAll(".longText p");
      paragraphs.forEach((p) => {
        const words = p.innerText.split(" ");
        p.innerHTML = words.map(w => `<span class="revealWord">${w} </span>`).join("");
      });

      // 2. TIMELINE DE SCROLL UNIQUE
// 2. TIMELINE DE SCROLL UNIQUE
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: "+=400%", // On allonge un peu pour plus de confort
    scrub: 1,
    pin: true,
  },
});

tl.to(textRef.current, { opacity: 0, y: -50, filter: "blur(10px)" }, 0)
  .to(imageRef.current, {
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
    bottom: 0,
    duration: 1 // L'image finit son zoom à l'indice 1
  }, 0)
  .to(buttonRef.current, { opacity: 1, y: -20 }, 0.3)
  
  // CHANGEMENT ICI : Why commence à 1 (pile quand l'image a fini son zoom)
  // On peut même mettre 1.1 pour laisser une mini pause "image fixe"
  .to(whyRef.current, { y: "0%", duration: 1 }, 1) 
  
  // Les mots s'allument après que Why soit bien en place (indice 2)
  .to(".revealWord", { 
      opacity: 1, 
      stagger: 0.02, 
      duration: 0.5 
  }, 2);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-container">
      {/* PARTIE INTRO */}
      <section className="intro-section">
        <h1 ref={textRef} className="headline">
          {headlineText.split(" ").map((word, i) => (
            <span key={i} className="word">{word} </span>
          ))}
        </h1>
        <div ref={imageRef} className="imageCard">
          <img src={heroImage} alt="Reda" />
        </div>
        <div ref={buttonRef} className="btn-wrapper" style={{ opacity: 0 }}>
          <button className="founderBtn">
            <div className="yellow"></div>About the founder
          </button>
        </div>
      </section>

      {/* PARTIE WHY (L'OVERLAY) */}
      <section ref={whyRef} className="why-overlay">
        <span className="smallTitle">[ PHILOSOPHY ]</span>
        <div className="longText">
      <p>
            Avec plus de 21 ans d’expérience dans des environnements exigeants
            — dont 15 années à des postes de responsabilités — Redha a
            longtemps évolué à haut niveau tout en faisant face à des
            difficultés personnelles bien réelles.
          </p>
          <p>
            En parcourant son propre chemin de transformation, il a
            progressivement retrouvé une énergie durable, une clarté d’esprit
            profonde et une discipline plus stable et alignée.
          </p>
          <p>
            Aujourd’hui, il met cette expérience vécue au service des personnes 
            qui souhaitent se reconnecter à elles-mêmes.
          </p>
        </div>
      </section>
    </div>
  );
}