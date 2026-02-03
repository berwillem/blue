import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import redaabout from "../../assets/images/redaabout.png";
import Button from "../../ui/button/Button";

interface AnimatedTextProps {
  text: string;
  delayOffset: number; // Délai avant le début du paragraphe
}

const wordVariants: Variants = {
  hidden: { opacity: 0.2 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 } // Vitesse d'allumage de chaque mot (plus lent)
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delayOffset }) => {
  const words = text.split(" ");

  const containerVariants: Variants = {
    visible: {
      transition: {
        delayChildren: delayOffset, // Attend son tour
        staggerChildren: 0.08,      // Vitesse entre chaque mot (augmentée pour ralentir)
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
  // Texte 1: environ 40 mots. À 0.08s par mot = ~3.2 secondes d'anim.
  // Texte 2: On le fait commencer après 3.5 secondes pour être sûr.
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
          <AnimatedText 
            delayOffset={0.1}
            text="Avec plus de 21 ans d’expérience dans des environnements exigeants — dont 15 années à des postes de responsabilités — Redha a longtemps évolué à haut niveau tout en faisant face à des difficultés personnelles bien réelles : surpoids, énergie faible, troubles de la concentration et déséquilibres métaboliques multiples." 
          />
          
          <AnimatedText 
            delayOffset={4.0} // Commence après la fin du premier
            text="En parcourant son propre chemin de transformation, il a progressivement retrouvé une énergie durable, une clarté d’esprit profonde et une discipline plus stable et alignée." 
          />

          <motion.div 
            className="button-about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.0, duration: 0.8 }} // Apparaît à la toute fin
          >
            <Button text="Book a meet" width="100%" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}