// @ts-nocheck
import { useEffect, useRef, useState } from "react";

import "./Results.css";
import Button from "../../ui/button/Button";

const FAKE_DATA = [
  "Our approach blends strategic clarity with human depth, guiding you through a journey of transformation. Our approach blends strategic clarity with human depth, guiding you through a journey of transformation.",
  "We analyze your unique metabolic markers to create a roadmap tailored specifically to your biology. Our approach blends strategic clarity with human depth, guiding you through a journey of transformation.",
  "Self-discipline isn't about restriction; it's about building the inner strength to make better choices. Our approach blends strategic clarity with human depth, guiding you through a journey of transformation.",
  "Optimal health is a long-term game where consistency beats intensity every single time. Our approach blends strategic clarity with human depth, guiding you through a journey of transformation.",
  "Through our methodology, you will discover the synergy between mental resilience and physical vitality. Our approach blends strategic clarity with human depth, guiding you through a journey of transformation.",
  "Your transformation starts now. Every step forward is a testament to your commitment. Our approach blends strategic clarity with human depth, guiding you through a journey of transformation."
];

export default function Results() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null); // Ref pour le bouton
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const paragraphs = containerRef.current.querySelectorAll(".result-paragraph");
    
    const startAutoScroll = async () => {
      // 1. Défilement des paragraphes
      for (let i = 0; i < paragraphs.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            paragraphs[i].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            resolve();
          }, 7000); 
        });
      }
      
      // 2. Faire apparaître le bouton
      setShowButton(true);

      // 3. Attendre un court instant que le bouton soit rendu, puis scroller dessus
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setIsAutoScrolling(false); // L'utilisateur reprend la main après le bouton
      }, 800);
    };

    startAutoScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("focused");
            entry.target.classList.add("passed");
          } else {
            entry.target.classList.remove("focused");
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", 
        threshold: 0, 
      }
    );

    paragraphs.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="results-wrapper">
      <h1>Result</h1>
      <div 
        className={`results-content ${isAutoScrolling ? "lock-user-scroll" : ""}`} 
        ref={containerRef}
      >
        <div className="spacer"></div>
        
        {FAKE_DATA.map((text, index) => (
          <p key={index} className="result-paragraph">
            {text}
          </p>
        ))}

        {/* Conteneur du bouton avec la ref */}
        <div 
          ref={buttonRef}
          className={`button-footer ${showButton ? "visible" : ""}`}
        >
           <Button text="Download the results" width="250px" />
        </div>

        <div className="spacer"></div>
      </div>
    </div>
  );
}