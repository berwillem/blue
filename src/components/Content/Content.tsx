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

export default function Content({ DATA, DATA2 }) {
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

  const numItems = DATA.length;
  const scrollRange = DATA.map((_, i) => i / (numItems - 1));
  const indexRange = DATA.map((_, i) => i);
  const activeIndex = useTransform(scrollYProgress, scrollRange, indexRange);

  useEffect(() => {
    if (!isPC) return;
    return activeIndex.on("change", (v) => {
      const val = Math.round(v);
      if (val !== currentIndex && val < numItems) {
        setCurrentIndex(val);
        setShow(false);
      }
    });
  }, [activeIndex, currentIndex, isPC, numItems]);

  return (
    <div
      className="content-scroll-wrapper"
      ref={containerRef}
      style={{ height: isPC ? `${numItems * 100}vh` : "auto", position: "relative" }}
    >
      {/* ANCRES POUR LA NAVIGATION (Desktop) */}
      {isPC && DATA.map((_, i) => (
        <div 
          key={i} 
          id={`section-${i}`} 
          style={{ 
            position: 'absolute', 
            top: `${i * 100}vh`, 
            height: '1px', 
            width: '1px' 
          }} 
        />
      ))}

      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        {/* --- MOBILE --- */}
        <div className="mobile">
          <img src={DATA2.img} alt={DATA2.title} />
          <h4>{DATA2.title}</h4>
          <p>{DATA2.leftText}</p>
          {DATA2?.moreContent?.paragraphs?.map((value, index) => (
            <motion.p
              key={index}
              className="right-description"
              animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0 }}
            >
              {value}
            </motion.p>
          ))}
          <p className="know-more" onClick={() => setShow(!show)}>
            <span>{show ? "show less" : "know more"}</span>
          </p>
          <div className="button-container">
            <Link to="/contact"><Button text={DATA2?.button} width="auto" /></Link>
          </div>
        </div>

        {/* --- DESKTOP --- */}
        {isPC && (
          <div className="big-size">
            <div className="left">
              <motion.h4 layout>{DATA[currentIndex]?.title}</motion.h4>
              <AnimatePresence mode="wait">
                <motion.p key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="description-text">
                  {DATA[currentIndex]?.leftText}
                </motion.p>
              </AnimatePresence>
              <div className="button-container">
                <Button text={DATA[currentIndex]?.button} width="auto" />
              </div>
            </div>

            <div className="right">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentIndex}
                  className="tiktok-slide-content"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.div 
                    className="image-wrapper-tiktok"
                    initial={{ filter: "grayscale(100%)" }}
                    animate={{ filter: "grayscale(0%)" }}
                    transition={{ duration: 3, times: [0.7, 1] }}
                  >
                    <img src={DATA[currentIndex]?.img} alt={DATA[currentIndex]?.title} />
                  </motion.div>
                  <p className="right-description">{DATA[currentIndex]?.rightDesc}</p>
                  <p className="know-more" onClick={() => setShow(!show)}>
                    <span>{show ? "show less" : "know more"}</span> <ArrowRight size={15} />
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}