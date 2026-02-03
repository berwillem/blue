import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Modus.css";

export default function Modus() {
  const containerRef = useRef(null);

  const steps = [
    { title: "Design", description: "Our process begins with the design phase, where we focus on in-depth analysis and shared reflection." },
    { title: "Train", description: "We align vision, mission, and strategy while defining clear targets and objectives." },
    { title: "Execute", description: "We ensure continuous follow-up through reflection and corrective measures." },
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
          start: "top 75%", // Se déclenche quand le haut de l'étape est à 75% de l'écran
          end: "top 35%",   // Arrive à 100% d'opacité à 35%
          scrub: 0.5,
        }
      });

      // On utilise fromTo pour garantir l'animation du badge et du texte
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
          "-=0.4" // Commence un peu avant la fin de l'opacité
        );
      }
    });
  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <div className="modus-container" ref={containerRef}>
      <h1>Discover our modus <br /> operandi</h1>
      <div className="modus-steps">
        {steps.map((step, index) => (
          <div key={index} className="modus-step">
            <div className="modus-guide">
              <div className="modus-step-circle">step 0{index + 1}</div>
              
              {/* Chaque étape a sa propre barre en dessous */}
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