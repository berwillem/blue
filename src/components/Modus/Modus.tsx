//@ts-nocheck
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Modus.css";

export default function Modus() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Construction dynamique du tableau à partir des traductions
  const steps = [
    { title: t("modus.steps.step1.title"), description: t("modus.steps.step1.desc") },
    { title: t("modus.steps.step2.title"), description: t("modus.steps.step2.desc") },
    { title: t("modus.steps.step3.title"), description: t("modus.steps.step3.desc") },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray(".modus-step");

      stepElements.forEach((step) => {
        const fillLine = step.querySelector(".step-line-fill");
        const text = step.querySelector(".modus-texts");
        const badge = step.querySelector(".modus-step-circle");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.5,
          }
        });

        tl.fromTo([badge, text], 
          { opacity: 0.3 }, 
          { 
            opacity: 1, 
            duration: 0.8, 
            ease: "none" 
          }
        );

        if (fillLine) {
          tl.fromTo(fillLine, 
            { scaleY: 0 }, 
            { 
              scaleY: 1, 
              duration: 1.2, 
              ease: "none" 
            }, 
            "-=0.4"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t]); // On rajoute t en dépendance pour recalculer si la langue change

  return (
    <div className="modus-container" ref={containerRef}>
      {/* Utilisation de white-space: pre-line dans le CSS pour le \n */}
      <h1>{t("modus.title")}</h1>
      
      <div className="modus-steps">
        {steps.map((step, index) => (
          <div key={index} className="modus-step">
            <div className="modus-guide">
              <div className="modus-step-circle">step 0{index + 1}</div>
              
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
    </div>
  );
}