// @ts-nocheck
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Disclaimer.css";

const DISCLAIMER_TEXTS = [
  "Before you begin, please understand that this assessment is for informational purposes only.",
  "The results provided are based on your personal inputs and should not replace professional medical advice.",
  "Your data privacy is our priority; all responses are processed securely and anonymously.",
  "By proceeding, you acknowledge that you are in a fit mental and physical state to take this test.",
  "Ready to discover your potential? Let's begin the evaluation.",
];

export default function Disclaimer() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current.querySelectorAll(".disc-paragraph");

      // Timeline qui gère l'apparition et la disparition de chaque phrase
      const tl = gsap.timeline({
        onComplete: () => {
          // Quand tout est fini, on redirige vers le test
          setTimeout(() => {
            navigate(`/tests/${testId}`);
          }, 1000); // Petit délai de confort après la dernière phrase
        }
      });

      paragraphs.forEach((p, index) => {
        // Pour chaque paragraphe, on l'affiche, on attend, puis on le cache
        tl.to(p, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(p, {
          opacity: 0,
          filter: "blur(15px)",
          y: -20,
          duration: 1,
          ease: "power3.in",
        }, "+=2"); // Temps de lecture (2 secondes par phrase)
      });
    }, containerRef);

    return () => ctx.revert();
  }, [navigate, testId]);

  return (
    <div className="Disclaimer-container" ref={containerRef}>
 
      
      <div className="Disclaimer-content">
        {DISCLAIMER_TEXTS.map((text, index) => (
          <p key={index} className="disc-paragraph">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}