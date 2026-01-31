import "./Intro.css"
import placeholder from "../../assets/images/redaplaceholder.png";
import Button from "../../ui/button/Button";
import BlurText from "../../ui/BlurText";
; // Assure-toi que le chemin est correct

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPC, setIsPC] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);

  // Détection du device
  useEffect(() => {
    const checkDevice = () => setIsPC(window.innerWidth > 1280);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // On suit le scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- TRANSFORMATIONS (Uniquement actives si isPC est true) ---
  // L'image passe de 80% à 100% de la largeur/hauteur et perd ses arrondis
  const width = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? ["80%", "100%"] : ["100%", "100%"],
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? ["70vh", "100vh"] : ["auto", "auto"],
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? ["2rem", "0rem"] : ["2rem", "2rem"],
  );
  const opacityText = useTransform(
    scrollYProgress,
    [0, 0.2],
    isPC ? [1, 0] : [1, 1],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.8 },
    );
    if (part2Ref.current) observer.observe(part2Ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="intro-container" ref={containerRef}>
      <div className="part1">
        <motion.div
          className="img-wrapper"
          style={{
            width: isPC ? width : "100%",
            height: isPC ? height : "auto",
            borderRadius: isPC ? borderRadius : "2rem",
            overflow: "hidden",
          }}
        >
          <img src={placeholder} alt="placeholder" className="main-img" />
        </motion.div>

        {/* On enveloppe BlurText dans un motion.div pour gérer la disparition au scroll */}
        <motion.div style={{ opacity: opacityText }} className="intro-h2-wrapper">
          <BlurText
            text="I conduct Blu to help people rebuild themselves—physically, mentally, and morally—so they can live with strength, purpose, and responsibility instead of exhaustion and confusion"
            delay={50}
            animateBy="words"
            direction="bottom"
            className="intro-title"
          />
        </motion.div>
      </div>

      <div className="part2" ref={part2Ref}>
        <img src={placeholder} alt="placeholder" className="img-scroll" />
        <motion.div
          className="scroll-btn"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        >
          <Button width="auto" text="About the founder" />
        </motion.div>
      </div>
    </div>
  );
}