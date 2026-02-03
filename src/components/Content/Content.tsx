// @ts-nocheck
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import Button from "../../ui/button/Button";
import "./Content.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import placeholder1 from "../../assets/images/redaplaceholder.png";
import placeholder2 from "../../assets/images/redaplaceholder.png";
import placeholder3 from "../../assets/images/redaplaceholder.png";

const DATA = [
  {
    id: 1,
    title: "Metabolic Method",
    leftText:
      "Executive metabolic method for high performers and achievers. Performance, discipline and purpose.",
    rightDesc:
      "At Blu., we deeply respect your privacy. Everything you share with us stays strictly confidential. ",
    rightDesc2:
      "We never disclose personal details, and your information is used only to support your wellness journey. You can trust us to protect your personal life with the utmost care and discretion. We take the protection of your personal data seriously. Any information you choose to share with us is handled with care, discretion, and confidentiality, and processed only for legitimate, clearly defined purposes related to our professional services. We do not disclose personal data to third parties without a valid legal basis, and we apply appropriate technical and organizational measures to safeguard your information against unauthorized access, misuse, or disclosure. Your personal data is processed in accordance with European Union data protection regulations (GDPR) and applicable confidentiality obligations. You may exercise your data protection rights at any time, in line with applicable law.",
    img: placeholder1,
  },
  {
    id: 2,
    title: "Precision Nutrition",
    leftText:
      "Tailored protocols to optimize your energy levels and cognitive clarity throughout the day.",
    rightDesc:
      "Optimize your brain and body with precision-based nutritional protocols.",
    rightDesc2:
      "Sustainable excellence begins with - through a profound balance of metabolism, mindset, and overall well being. Sustainable excellence begins with",
    img: placeholder2,
  },
  {
    id: 3,
    title: "Resilient Health",
    leftText:
      "A transformative journey designed for those who refuse to settle for average health.",
    rightDesc:
      "Long-term health is not an accident; it's a deliberate executive strategy.",
    rightDesc2:
      "Sustainable excellence begins with - through a profound balance of metabolism, mindset, and overall well being. Sustainable excellence begins with",
    img: placeholder3,
  },
];

export default function Content() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPC, setIsPC] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth >= 1280);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1], // On définit 0.75 comme la fin du mouvement
    [0, 0, 1, 2, 2],
  );

  useEffect(() => {
    if (!isPC) return;
    return activeIndex.onChange((v) => {
      const val = Math.round(v);
      if (val !== currentIndex) setCurrentIndex(val);
    });
  }, [activeIndex, currentIndex, isPC]);

 // ... (imports inchangés)



  return (
    <div
      className="content-scroll-wrapper"
      ref={containerRef}
      style={{ height: isPC ? "300vh" : "100dvh" }}
    >
      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        
            <div className="mobile">
          <img src={DATA[0].img} alt={DATA[0].title} />
          <h4>Why we do what we do?</h4>
          <p>{DATA[0].leftText}</p>
          <motion.p
            className="right-description"
            initial={false}
            animate={{
              height: show ? "auto" : 0,
              opacity: show ? 1 : 0,
              marginBottom: show ? 15 : 0, // Optionnel: pour l'espace en bas
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {DATA[currentIndex].rightDesc2}
          </motion.p>
          <p
            className="know-more seeMore"
            onClick={() => {
              setShow(!show);
            }}
          >
            <span> know more</span>
          </p>
          <div className="button-container">
            <Link to="/tests/metabolic-health">
              <Button text="Start a metabolic test" width="auto" />
            </Link>
          </div>
        </div>

        {/* --- VERSION DESKTOP --- */}
        <div className="big-size">
          
          {/* CÔTÉ GAUCHE */}
          <div className="left">
            <motion.h4 layout> {DATA[currentIndex].title}</motion.h4>
            <div className="rotating-text-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                  layout // Permet au container de s'adapter si show change
                >
                  <motion.p layout className="description-text">
                    {DATA[currentIndex].leftText}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div layout className="button-container">
              <Link to="/tests/metabolic-health">
                <Button text="Start a metabolic test" width="auto" />
              </Link>
            </motion.div>
          </div>

          {/* CÔTÉ DROIT */}
      {/* CÔTÉ DROIT */}
<div className="right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.div
      key={currentIndex}
      className="tiktok-slide-content"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      layout
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}
    >
      {/* L'image est maintenant en haut mais sera poussée si le texte en bas grandit */}
      <motion.div layout className="image-wrapper-tiktok" >
        <img src={DATA[currentIndex].img} alt="Metabolic" />
      </motion.div>
      
      <motion.p layout className="right-description">
        {DATA[currentIndex].rightDesc}
      </motion.p>

      {/* Section extensible */}
      <motion.div >
        <AnimatePresence initial={false}>
          {show && (
            <motion.p
              className="right-description"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ fontSize: '0.9rem', lineHeight: '1.4' }}
            >
              {DATA[currentIndex].rightDesc2}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        layout
        style={{ cursor: "pointer", display: "inline-block", marginTop: "10px" }}
        onClick={() => setShow(!show)}
      >
        <p className="know-more">
          {show ? "show less" : "know more"}{" "}
          <motion.span
            animate={{ rotate: show ? 90 : 0 }}
            style={{ display: "inline-block" }}
          >
            <ArrowRight size={15} />
          </motion.span>
        </p>
      </motion.div>
    </motion.div>
  </AnimatePresence>
</div>
        </div>
      </div>
    </div>
  );
}

