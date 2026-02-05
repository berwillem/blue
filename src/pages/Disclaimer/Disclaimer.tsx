// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./Disclaimer.css"; // Réutilise ou adapte le CSS précédent
import Button from "../../ui/button/Button";

const DISCLAIMER_TEXTS = [
  "Before you begin, please understand that this assessment is for informational purposes only.",
  "The results provided are based on your personal inputs and should not replace professional medical advice.",
  "Your data privacy is our priority; all responses are processed securely and anonymously.",
  "By proceeding, you acknowledge that you are in a fit mental and physical state to take this test.",
  "Ready to discover your potential? Let's begin the evaluation."
];

export default function Disclaimer() {
  const { testId } = useParams(); // Récupère le nom du test (ex: 'metabolic')
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const paragraphs = containerRef.current.querySelectorAll(".result-paragraph");
    
    const runSequence = async () => {
      await new Promise(r => setTimeout(r, 200));
      
      for (let i = 0; i < paragraphs.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            paragraphs[i].scrollIntoView({ behavior: "smooth", block: "center" });
            resolve();
          }, 1000);
        });
      }
      
      setShowButton(true);
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsAutoScrolling(false);
      }, 800);
    };

    runSequence();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => e.isIntersecting ? e.target.classList.add("focused") : e.target.classList.remove("focused"));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    paragraphs.forEach(p => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  const handleStart = () => {
    // Envoie l'utilisateur vers le test spécifique
    navigate(`/tests/${testId}`);
  };

 
  return (
    <div className="results-wrapper">
      <h1>Disclaimer</h1>
      <div 
        className={`results-content ${isAutoScrolling ? "lock-user-scroll" : ""}`} 
        ref={containerRef}
      >
        <div className="spacer"></div>
        
        {DISCLAIMER_TEXTS.map((text, index) => (
          <p key={index} className="result-paragraph">
            {text}
          </p>
        ))}

        {/* Conteneur du bouton avec la ref */}
        <div 
          ref={buttonRef}
          className={`button-footer ${showButton ? "visible" : ""}`}
           onClick={handleStart}
        >
           <Button text="Download the results" width="250px" />
        </div>

        <div className="spacer"></div>
      </div>
    </div>
  );
}