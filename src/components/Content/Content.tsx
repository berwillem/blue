import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import placeholder from "../../assets/images/redaplaceholder.png";
import Button from "../../ui/button/Button";
import "./Content.css";
import { ArrowRight } from "lucide-react";

const LEFT_TEXTS = [
  "Executive metabolic method for high performers and achievers. Performance, discipline and purpose.",
  "Tailored protocols to optimize your energy levels and cognitive clarity throughout the day.",
  "A transformative journey designed for those who refuse to settle for average health."
];

// 1. On crée un sous-composant pour éviter de casser les règles des Hooks
const RotatingWord = ({ text, index, total, progress }: { text: string, index: number, total: number, progress: MotionValue<number> }) => {
  const start = index / total;
  const end = (index + 1) / total;

  // Chaque instance du composant a ses propres hooks, c'est légal en React
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.1, end - 0.1, end], [20, 0, 0, -20]);
  const filter = useTransform(progress, [start, start + 0.1, end - 0.1, end], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]);

  return (
    <motion.p style={{ opacity, y, filter, position: "absolute", top: 0 }}>
      {text}
    </motion.p>
  );
};

export default function Content() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth > 1280);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div 
      className="content-scroll-wrapper" 
      ref={containerRef} 
      style={{ height: isPC ? "300vh" : "auto" }}
    >
      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        
        {/* MOBILE (Reste intact) */}
        <div className="mobile">
          <img src={placeholder} alt="Placeholder" />
          <h4>Why we do what we do?</h4>
          <p>{LEFT_TEXTS[0]}</p>
          <div className="button-container">
            <Button text="Start a metabolic test" width="auto" />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="big-size">
          <div className="left">
            <h4>Why we do what we do?</h4>
            
            <div className="rotating-text-box">
              {isPC ? (
                LEFT_TEXTS.map((text, index) => (
                  <RotatingWord 
                    key={index} 
                    text={text} 
                    index={index} 
                    total={LEFT_TEXTS.length} 
                    progress={scrollYProgress} 
                  />
                ))
              ) : (
                <p>{LEFT_TEXTS[0]}</p>
              )}
            </div>

            <div className="button-container">
              <Button text="Start a metabolic test" width="auto" />
            </div>
          </div>

          <div className="right">
            <p>
              Sustainable excellence begins with - through a profound balance of
              metabolism, mindset, and overall well being.
            </p>
            <img src={placeholder} alt="Placeholder" />
            <p className="know-more">
              know more <ArrowRight size={15} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}