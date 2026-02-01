import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import logo from "../../assets/images/logo1.png";

export default function Home() {
  const setUserType = useUserTypeStore((state) => state.setUserType);
  const [step, setStep] = useState(0); // 0: Proverbe 1, 1: Proverbe 2, 2: Menu Final

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000); // 2ème proverbe à 2s
    const timer2 = setTimeout(() => setStep(2), 4000); // Menu final à 4s
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="home-container">
      {/* Côté Individuals */}
      <Link 
        to="/individuals" 
        onClick={(e) => step < 2 ? e.preventDefault() : setUserType("individuals")}
        style={{ cursor: step < 2 ? "default" : "pointer" }}
      >
        <div className="individuals">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.h1 key="q1" {...variants}>"Build with purpose"</motion.h1>
            )}
            {step === 1 && (
              <motion.h1 key="q2" {...variants}>"Strength in discipline"</motion.h1>
            )}
            {step === 2 && (
              <motion.div key="final" {...variants}>
                <h1>Individuals</h1>
                <p>Coaching and mentoring</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Côté Corporates */}
      <Link 
        to="/corporates" 
        onClick={(e) => step < 2 ? e.preventDefault() : setUserType("corporates")}
        style={{ cursor: step < 2 ? "default" : "pointer" }}
      >
        <div className="corporates">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.h1 key="q3" {...variants}>"Lead with responsibility"</motion.h1>
            )}
            {step === 1 && (
              <motion.h1 key="q4" {...variants}>"Clarity is power"</motion.h1>
            )}
            {step === 2 && (
              <motion.div key="final2" {...variants}>
                <h1>Corporates</h1>
                <p>Consulting and advice</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      <img src={logo} alt="Logo" className="home-logo" style={{ opacity: step < 2 ? 0.5 : 1 }} />
    </div>
  );
}