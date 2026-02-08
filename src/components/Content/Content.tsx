// @ts-nocheck
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Button from "../../ui/button/Button";
import "./Content.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. Import de la traduction

export default function Content({ DATA, DATA2 }) {
  const { t } = useTranslation(); // 2. Initialisation
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
    return activeIndex.onChange((v) => {
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
      style={{ height: isPC ? `${numItems * 100}vh` : "auto" }}
    >
      {isPC && DATA.map((_, i) => (
        <div key={i} id={`section-${i}`} style={{ position: 'absolute', top: `${i * 100}vh`, height: '1px', width: '1px' }} />
      ))}

      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        
        {/* --- MOBILE --- */}
        <motion.div className="mobile">
          <img src={DATA2.img} alt={DATA2.title} />
          <h4>{DATA2.title}</h4>
          <p>{DATA2.leftText}</p>

          {DATA2?.moreContent?.paragraphs?.map((value, index) => (
            <motion.p
              key={index}
              className="right-description"
              initial={false}
              animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0, marginBottom: show ? 15 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ overflow: "hidden" }}
            >
              {value}
            </motion.p>
          ))}

          {/* Bouton Know More / Show Less Mobile */}
          <p className="know-more seeMore" style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
            <span>{show ? t('show_less') : t('know_more')}</span>
          </p>

          <div className="button-container">
            <Link to={DATA[currentIndex]?.button.includes("test") ? "/tests/metabolic-health" : "/contact"}>
              <Button text={DATA2?.button} width="auto" />
            </Link>
          </div>
        </motion.div>

        {/* --- DESKTOP --- */}
        {isPC && (
          <div className="big-size">
            <div className="left">
              <motion.h4 layout>{DATA[currentIndex]?.title}</motion.h4>
              <div className="rotating-text-box">
                <AnimatePresence mode="wait">
                  <motion.div key={currentIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <p className="description-text">{DATA[currentIndex]?.leftText}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="button-container">
                <Link to={DATA[currentIndex]?.button.includes("test") ? "/tests/personal-capacity" : "/contact"}>
                  <Button text={DATA[currentIndex]?.button} width="auto" />
                </Link>
              </div>
            </div>

            <div className="right">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={currentIndex} className="tiktok-slide-content" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.7 }}>
                  <div className="image-wrapper-tiktok">
                    <img src={DATA[currentIndex]?.img} alt={DATA[currentIndex]?.title} />
                  </div>
                  <p className="right-description">{DATA[currentIndex]?.rightDesc}</p>

                  <AnimatePresence>
                    {show && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="expanded-content">
                        {DATA[currentIndex]?.moreContent?.paragraphs?.map((p, i) => (
                          <p key={i} className="right-description" style={{ fontSize: "0.9rem", marginBottom: "15px" }}>{p}</p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bouton Know More / Show Less Desktop */}
                  <div style={{ cursor: "pointer", display: "inline-block", marginTop: "10px" }} onClick={() => setShow(!show)}>
                    <p className="know-more">
                      <span>{show ? t('show_less') : t('know_more')}</span>
                      <motion.span animate={{ rotate: show ? 90 : 0 }} style={{ display: "flex", alignItems: "center" }}>
                        <ArrowRight size={15} />
                      </motion.span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}