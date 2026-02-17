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
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/useUserTypeStore";

export default function Content({ DATA, DATA2 }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);

  // Fonction pour trouver le bon lien selon le texte du bouton
  const getButtonLink = (buttonText) => {
    if (!buttonText) return "/";

    const text = buttonText.toLowerCase();

    // 1. Metabolic Test
    if (text.includes("méthode") || text.includes("method")) {
      return "/method";
    }
    if (text.includes("metabolic") || text.includes("métabolique")) {
      return "/disclaimer/metabolic-health";
    }

    // 2. Personal Capacity Test
    if (text.includes("capacity") || text.includes("capacité")) {
      return "/disclaimer/personal-capacity";
    }

    return "/";
  };
  const [isPC, setIsPC] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Correction 1: Utiliser matchMedia pour une détection plus stable sur mobile physique
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const checkDevice = () => setIsPC(mediaQuery.matches);

    checkDevice();
    mediaQuery.addEventListener("change", checkDevice);
    return () => mediaQuery.removeEventListener("change", checkDevice);
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
      {isPC &&
        DATA.map((_, i) => (
          <div
            key={i}
            id={`section-${i}`}
            style={{
              position: "absolute",
              top: `${i * 100}vh`,
              height: "1px",
              width: "1px",
            }}
          />
        ))}
      <div className={`content-container ${isPC ? "sticky-active" : ""}`}>
        {/* --- MOBILE --- */}
        {/* Correction 2: margin de -300px remplacé par -50px pour mobile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mobile"
        >
          <motion.div
            layout
            initial={{ filter: "grayscale(100%)" }}
            // CHANGEMENT ICI : On utilise whileInView pour déclencher au scroll
            whileInView={{ filter: "grayscale(0%)" }}
            // On s'assure que l'animation part quand 20% de l'image est visible
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 3,
                      times: [0.3, 1],
                      ease: "easeInOut",
            }}
          >
            <img src={DATA2?.img} alt={DATA2?.title} />
          </motion.div>
<div className="content_text">
        <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
      </div>
            <h4>{DATA2.title}</h4>
          <p>{DATA2.leftText}</p>

{DATA2?.moreContent?.paragraphs?.map((value, index) => (
  <motion.div
    key={index}
    initial={false}
    animate={{
      height: show ? "auto" : 0,
      opacity: show ? 1 : 0,
      marginBottom: show ? 15 : 0,
      display: show ? "block" : "none", 
    }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    style={{ overflow: "hidden" }}
  >
    <p
      className="right-description"
      style={{
        fontSize: "1.2rem",
        marginBottom: "8px",
        color: "#002b49",
        fontWeight: "bold",
      }}
    >
      {value.title}
    </p>
    <p className="right-description">
      {value.text}
    </p>
  </motion.div>
))}

{DATA2?.moreContent?.lists?.map((list, idx) => (
  <motion.div
    key={idx}
    className="dynamic-list-area"
    initial={false}
    animate={{
      height: show ? "auto" : 0,
      opacity: show ? 1 : 0,
      marginBottom: show ? 20 : 0,
      display: show ? "block" : "none", // <--- Idem ici pour les listes
    }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    style={{ overflow: "hidden" }}
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

          <p
            className="know-more seeMore2"
            style={{ cursor: "pointer" }}
            onClick={() => setShow(!show)}
          >
            <span>{show ? t("show_less") : t("know_more")}</span>
          </p>

</div>
      {DATA2?.button &&     <div className="button-container">
            <Link to={getButtonLink(DATA[currentIndex]?.button)}>
              <Button text={DATA2?.button} width="auto" />
            </Link>
          </div>}
        </motion.div>

        {/* --- DESKTOP --- */}
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
{DATA[currentIndex]?.button &&    <motion.div layout className="button-container">
                <Link to={getButtonLink(DATA[currentIndex]?.button)}>
                  <Button text={DATA[currentIndex]?.button} width="auto" />
                </Link>
              </motion.div>}
           
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
                  <motion.div
                    layout
                    className="image-wrapper-tiktok"
                    initial={{ filter: "grayscale(100%)" }}
                    animate={{ filter: "grayscale(0%)" }}
                    transition={{
                      duration: 3,
                      times: [0.3, 1],
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={DATA[currentIndex]?.img}
                      alt={DATA[currentIndex]?.title}
                    />
                  </motion.div>
                  {DATA[currentIndex]?.title_rightDesc && (
                    <motion.p
                      layout
                      className="right-description"
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "8px",
                        color: "#002b49",
                        fontWeight: "bold",
                      }}
                    >
                      {DATA[currentIndex]?.title_rightDesc}
                    </motion.p>
                  )}

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
                              <>
                                <p
                                  style={{
                                    fontSize: "1.2rem",
                                    marginBottom: "8px",
                                    color: "#002b49",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {" "}
                                  {p.title}
                                </p>
                                <p
                                  key={i}
                                  className="right-description"
                                  style={{
                                    fontSize: "0.9rem",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {p.text}
                                </p>
                              </>
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
                      <span>{show ? t("show_less") : t("know_more")}</span>
                      <motion.span
                        animate={{ rotate: show ? 90 : 0 }}
                        style={{ display: "flex", alignItems: "center" }}
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
