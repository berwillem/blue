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
    // 1. Empêche le "shake" quand la barre d'adresse mobile bouge
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray(".modus-step");

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          // 2. Recalcule les positions si le mobile bug au chargement
          invalidateOnRefresh: true,
          // 3. Empêche la superposition sur la section précédente
          anticipatePin: 1, 
        },
      });

      stepElements.forEach((step, index) => {
        const fillLine = step.querySelector(".step-line-fill");
        const text = step.querySelector(".modus-texts");
        const badge = step.querySelector(".modus-step-circle");

        mainTl.to([badge, text], {
          opacity: 1,
          duration: 0.5,
        });

        if (fillLine) {
          mainTl.to(fillLine, {
            scaleY: 1,
            duration: 1,
            ease: "none",
          });
        }
      });
    }, containerRef);

    // 4. Le "Refresh" magique : attend 200ms que le téléphone ait fini de poser le layout
    // pour supprimer l'espace blanc.
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
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