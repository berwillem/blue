// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import redaabout from "../../assets/images/redaabout.png";
import Button from "../../ui/button/Button";
import { useTranslation } from "react-i18next";

interface AnimatedTextProps {
  text: string;
  delayOffset: number;
}

const wordVariants: Variants = {
  hidden: { opacity: 0.2 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 } 
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delayOffset }) => {
  const words = text.split(" ");

  const containerVariants: Variants = {
    visible: {
      transition: {
        delayChildren: delayOffset,
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.p 
      className="reveal-text-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="word-wrapper">
          <motion.span variants={wordVariants}>
            {word}{" "}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

export default function About() {
  const { t, i18n } = useTranslation();

  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "why_us", path: "#" },
    { name: "services", path: "#" }
  ];

  return (
    <div className="about-container">
      <Navbar links={links} />
      <div className="about-content">
        <img src={redaabout} alt="about" />
        <div className="left">
          {/* On utilise i18n.language dans la key pour forcer le re-mount et relancer l'anim au switch de langue */}
          <AnimatedText 
            key={`p1-${i18n.language}`}
            delayOffset={0.1}
            text={t("about.paragraph1")} 
          />
          
          <AnimatedText 
            key={`p2-${i18n.language}`}
            delayOffset={4.0} 
            text={t("about.paragraph2")} 
          />

          <motion.div 
            className="button-about"
            key={`btn-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.0, duration: 0.8 }}
          >
            <Button text={t("about.button")} width="100%" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}