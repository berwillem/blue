import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Modus.css";

export default function Modus() {
  const barRef = useRef(null);

  const steps = [
    { title: "Design", description: "This is the design phase." },
    { title: "Development", description: "This is the development phase." },
    { title: "Launch", description: "This is the launch phase." },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(barRef.current, {
      scaleY: 1,
      transformOrigin: "top center",
      scrollTrigger: {
        trigger: barRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="modus-container">
      <h1>
        Discover our modus <br /> operandi
      </h1>
      <div className="modus-steps">
        {/* Vertical progress bar */}
        <div className="modus-progress-bar">
          <div className="modus-progress-fill" ref={barRef}></div>
        </div>

        {steps.map((step, index) => (
          <div key={index} className="modus-step">
            <div className="modus-guide">
              <div className="modus-step-circle">step {index + 1}</div>
              <div className="modus-step-line"></div>
            </div>
            <div
              className={`modus-texts ${index % 2 === 1 ? "left" : "right"}`}
            >
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
