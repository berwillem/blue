// @ts-nocheck
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Modus.css";

gsap.registerPlugin(ScrollTrigger);

export default function Modus() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const steps = [
    { title: t("modus.steps.step1.title"), description: t("modus.steps.step1.desc") },
    { title: t("modus.steps.step2.title"), description: t("modus.steps.step2.desc") },
    { title: t("modus.steps.step3.title"), description: t("modus.steps.step3.desc") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray(".modus-step");

      // Création de la timeline qui bloque l'écran
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      // Bloque quand le haut de la section touche le haut de l'écran
          end: "+=300%",         // Durée du blocage (300% de la hauteur de l'écran)
          pin: true,             // BLOQUE LA PAGE
          pinSpacing: true,      // Garde l'espace pour la suite
          scrub: 1,              // L'animation suit la molette
        },
      });

      // On ajoute chaque étape à la timeline principale
      stepElements.forEach((step, index) => {
        const fillLine = step.querySelector(".step-line-fill");
        const text = step.querySelector(".modus-texts");
        const badge = step.querySelector(".modus-step-circle");

        // Apparition du texte et du badge
        mainTl.to([badge, text], {
          opacity: 1,
          duration: 0.5,
        });

        // Animation de la ligne de remplissage
        if (fillLine) {
          mainTl.to(fillLine, {
            scaleY: 1,
            duration: 1,
            ease: "none",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section className="modus-container" ref={containerRef}>
      <h1>{t("modus.title")}</h1>
      
      <div className="modus-steps">
        {steps.map((step, index) => (
          <div key={index} className="modus-step">
            <div className="modus-guide">
              <div className="modus-step-circle">step 0{index + 1}</div>
              
              <div className="step-line-container">
                <div className="step-line-bg"></div>
                <div className="step-line-fill"></div>
              </div>
            </div>

            <div className={`modus-texts ${index % 2 === 1 ? "left" : "right"}`}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}