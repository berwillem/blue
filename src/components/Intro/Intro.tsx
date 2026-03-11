// @ts-nocheck
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/Plan de travail 1.jpg";
import heroImage2 from "../../assets/images/Plan de travail 2.jpg";


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
  const [isphone, setIsphone] = useState(false)
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 720px)");
      const checkDevice = () => setIsphone(mediaQuery.matches);
      checkDevice();
      mediaQuery.addEventListener("change", checkDevice);
      return () => mediaQuery.removeEventListener("change", checkDevice);
    }, []);
  const { t, i18n } = useTranslation();

const renderSplitText = (textKey, className) => {
  const text = t(textKey); // Récupère le texte traduit

  // Utilisation d'une expression régulière pour capturer les balises HTML <strong>...</strong>
  const regex = /(<strong>.*?<\/strong>)/g;

  // Séparation du texte en morceaux, y compris les balises HTML
  const splitText = text.split(regex);

  return splitText.map((part, i) => {
    // Si la partie est une balise <strong>...</strong>, on l'affiche avec dangerouslySetInnerHTML
    if (part.match(/<strong>/)) {
      return (
        <span key={i} className={className} dangerouslySetInnerHTML={{ __html: part }} />
      );
    }

    // Sinon, chaque mot est affiché avec la classe et l'animation (ici l'animation reste inchangée)
    return part.split(" ").map((word, index) => (
      <span key={`${i}-${index}`} className={className}>
        {word}&nbsp;
      </span>
    ));
  });
};

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const titleWords = textRef.current?.querySelectorAll(".word");
      const revealWords = whyRef.current?.querySelectorAll(".revealWord");

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

      if (titleWords) gsap.set(titleWords, { opacity: 0, y: 30, filter: "blur(15px)" });
      if (revealWords) gsap.set(revealWords, { opacity: 0.15 });

      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", 
          once: true,       
        },
        defaults: { ease: "power4.out" },
      });

      entryTl.to(imageRef.current, { opacity: 1, duration: 1.2 }).to(
        titleWords,
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.02, duration: 1 },
        "-=0.8",
      );

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

      // --- AJOUT CRUCIAL ICI ---
      window.introTrigger = mainTl.scrollTrigger;

      mainTl
        .to(textRef.current, { opacity: 0, y: -50, filter: "blur(10px)", duration: 1 })
        .to(imageRef.current, { width: "100vw", height: "100dvh", borderRadius: 0, bottom: 0, duration: 1 }, "<")
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<0.2")
        .to(whyRef.current, { y: "0%", duration: 1 }, "+=0.2")
        .to(revealWords, { opacity: 1, stagger: 0.02, duration: 0.5 }, "<0.5");
    }, containerRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      ctx.revert();
      window.introTrigger = null;
      clearTimeout(timer);
    };
  }, [t, i18n.language]);

  return (
    <section ref={containerRef} className="hero-container">
      <div className="intro-section">
        <h1 ref={textRef} className="headline" key={`h1-${i18n.language}`}>
          {renderSplitText("individuals.main_title", "word")}
          <span className="word" style={{ display: 'block', textAlign: 'right', fontSize: '0.7em', marginTop: '10px' }}>-Redha</span>
        </h1>
        <div ref={imageRef} className="imageCard">
          {isphone ? <img src={heroImage2} alt="Intro" className="background" /> : <img src={heroImage} alt="Intro" className="background" />
}
        
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
      <section ref={whyRef} className="why-overlay" key={`why-${i18n.language}`} id="why">
        <span className="smallTitle">{t("individuals.why")}</span>
        <div className="longText">
          <p>{renderSplitText("individuals.whyp1", "revealWord")}</p>
          <p>{renderSplitText("individuals.whyp2", "revealWord")}</p>
          <p>{renderSplitText("individuals.whyp3", "revealWord")}</p>
          <p>{renderSplitText("individuals.whyp4", "revealWord")}</p>
        </div>
      </section>
    </section>
  );
}