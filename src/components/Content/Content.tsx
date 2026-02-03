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

export default function Content({ DATA }) {
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
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0, 1, 2, 2],
  );

  useEffect(() => {
    if (!isPC) return;
    return activeIndex.onChange((v) => {
      const val = Math.round(v);
      if (val !== currentIndex) setCurrentIndex(val);
    });
  }, [activeIndex, currentIndex, isPC]);

  return (
    <div
      className="content-scroll-wrapper"
      ref={containerRef}
      style={{ height: isPC ? "300vh" : "100dvh" }}
    >
      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        {/* --- VERSION MOBILE --- */}
        <div className="mobile">
          <img src={DATA[0].img} alt={DATA[0].title} />
          <h4>Why we do what we do?</h4>
          <p>{DATA[0].leftText}</p>
          {show && (
            <p className="right-description">{DATA[currentIndex].rightDesc2}</p>
          )}
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
          <div className="left">
            <h4> {DATA[currentIndex].title}</h4>
            <div className="rotating-text-box">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {DATA[currentIndex].leftText}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="button-container">
              <Link to="/tests/metabolic-health">
                <Button text="Start a metabolic test" width="auto" />
              </Link>
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
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="image-wrapper-tiktok">
                  <img src={DATA[currentIndex].img} alt="Metabolic" />
                </div>
                <p className="right-description">
                  {DATA[currentIndex].rightDesc}
                </p>
                {show && (
                  <p className="right-description">
                    {DATA[currentIndex].rightDesc2}
                  </p>
                )}
                <Link
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <p className="know-more">
                    know more <ArrowRight size={15} />
                  </p>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
