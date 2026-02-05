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
  console.log(DATA2);

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

  // --- LOGIQUE DYNAMIQUE ---
  // On crée des paliers basés sur le nombre d'éléments dans DATA
  const numItems = DATA.length;
  // Exemple pour 7 items: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1]
  const scrollRange = DATA.map((_, i) => i / (numItems - 1));
  // Exemple pour 7 items: [0, 1, 2, 3, 4, 5, 6]
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
      // On donne assez de hauteur pour scroller confortablement à travers les 7 items
      style={{ height: isPC ? `${numItems * 100}vh` : "auto" }}
    >
      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        {/* --- MOBILE (Scroll standard) --- */}
   <div className="mobile">
  <img src={DATA2.img} alt={DATA2.title} />
  <h4>{DATA2.title}</h4>
  <p>{DATA2.leftText}</p>

  {/* Paragraphes additionnels */}
  {DATA2?.moreContent?.paragraphs?.map((value, index) => (
    <motion.p
      key={index}
      className="right-description"
      initial={false}
      animate={{
        height: show ? "auto" : 0,
        opacity: show ? 1 : 0,
        marginBottom: show ? 15 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ overflow: "hidden" }}
    >
      {value}
    </motion.p>
  ))}

  {/* Listes additionnelles corrigées */}
  {DATA2?.moreContent?.lists?.map((list, idx) => (
    <motion.div
      key={idx}
      className="dynamic-list-area"
      initial={false}
      animate={{
        height: show ? "auto" : 0,
        opacity: show ? 1 : 0,
        marginBottom: show ? 20 : 0, // Fusion des styles ici
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ overflow: "hidden" }} // Assure que le contenu est bien masqué
    >
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "8px",
          color: "#002b49",
          fontWeight: "bold",
        }}
      >
        {list.title}
      </p>
      <ul
        style={{
          paddingLeft: "20px",
          fontSize: "0.85rem",
          listStyleType: "disc",
        }}
      >
        {list.items.map((item, i) => (
          <li key={i} style={{ marginBottom: "5px" }}>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  ))}

  {/* Bouton Know More / Show Less */}
  <p
    className="know-more seeMore"
    style={{ cursor: "pointer" }}
    onClick={() => setShow(!show)}
  >
    <span>{show ? "show less" : "know more"}</span>
  </p>

  <div className="button-container">
    <Link to="/tests/metabolic-health">
      <Button text="Start a metabolic test" width="auto" />
    </Link>
  </div>
</div>
        {/* --- DESKTOP (Sticky Scroll) --- */}
        {isPC && (
          <div className="big-size">
            <div className="left">
              <motion.h4 layout>{DATA[currentIndex]?.title}</motion.h4>
              <div className="rotating-text-box">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: "flex", flexDirection: "column" }}
                    layout
                  >
                    <motion.p layout className="description-text">
                      {DATA[currentIndex]?.leftText}
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

            <div className="right">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentIndex}
                  className="tiktok-slide-content"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  layout
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <motion.div layout className="image-wrapper-tiktok" initial={{ filter: "grayscale(100%)" }}
                  animate={{ filter: "grayscale(0%)" }} transition={{ duration: 3 }}>
                    <img
                      src={DATA[currentIndex]?.img}
                      alt={DATA[currentIndex]?.title}
                    />
                  </motion.div>

                  <motion.p layout className="right-description">
                    {DATA[currentIndex]?.rightDesc}
                  </motion.p>

                  <motion.div layout>
                    <AnimatePresence initial={false}>
                      {show && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                          className="expanded-content"
                        >
                          {DATA[currentIndex]?.moreContent?.paragraphs?.map(
                            (p, i) => (
                              <p
                                key={i}
                                className="right-description"
                                style={{
                                  fontSize: "0.9rem",
                                  marginBottom: "15px",
                                }}
                              >
                                {p}
                              </p>
                            ),
                          )}

                          {DATA[currentIndex]?.moreContent?.lists?.map(
                            (list, idx) => (
                              <div
                                key={idx}
                                className="dynamic-list-area"
                                style={{ marginBottom: "20px" }}
                              >
                                <p
                                  style={{
                                    fontSize: "1.2rem",
                                    marginBottom: "8px",
                                    color: "#002b49",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {list.title}
                                </p>
                                <ul
                                  style={{
                                    paddingLeft: "20px",
                                    fontSize: "0.85rem",
                                    listStyleType: "disc",
                                  }}
                                >
                                  {list.items.map((item, i) => (
                                    <li key={i} style={{ marginBottom: "5px" }}>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ),
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    layout
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                    onClick={() => setShow(!show)}
                  >
                    <p className="know-more">
                      <span>    {show ? "show less" : "know more"}{" "}</span>
                  
                      <motion.span
                        animate={{ rotate: show ? 90 : 0 }}
                        style={{ display: "flex" ,alignItems:"center" }}
                      >
                        <ArrowRight size={15} />
                      </motion.span>
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
