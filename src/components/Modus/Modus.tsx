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
    // 1. Désactive le redimensionnement agressif sur mobile (évite les sauts de section)
    ScrollTrigger.config({ 
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" 
    });

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray(".modus-step");

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Se bloque quand le haut de la section touche le haut de l'écran
          end: "+=250%",    // Ajusté légèrement pour la fluidité mobile
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true, 
          anticipatePin: 1, // Très important : prépare le "pin" avant d'arriver pour éviter le glitch
          fastScrollEnd: true, // Aide à sortir proprement de la section si l'utilisateur scrolle vite
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

        if (fillLine && index < stepElements.length - 1) { // Ne pas animer la ligne après la dernière étape
          mainTl.to(fillLine, {
            scaleY: 1,
            duration: 1,
            ease: "none",
          });
        }
      });
    }, containerRef);

    // 2. Forcer un refresh après un court délai pour que GSAP prenne en compte la fin du rendu des sections "Content"
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
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
              {/* On n'affiche pas la ligne pour la dernière étape si nécessaire */}
              {index < steps.length - 1 && (
                <div className="step-line-container">
                  <div className="step-line-bg"></div>
                  <div className="step-line-fill"></div>
                </div>
              )}
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