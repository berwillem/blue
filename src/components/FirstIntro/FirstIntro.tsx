// @ts-nocheck
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import "./FirstIntro.css"

// Tes imports d'images restent les mêmes
import card1 from "../../assets/images/Cardio.png"
import card2 from "../../assets/images/Depression.png"
import card3 from "../../assets/images/Allergies.png"
import card4 from "../../assets/images/Infertility.png"
import card5 from "../../assets/images/Autoimmune disease.png"
import card6 from "../../assets/images/Type 2 diabetes.png"
import card7 from "../../assets/images/Skin issues.png"
import card8 from "../../assets/images/Male sexual dysfunction.png"

const Cards = [
  { titleKey: "individuals.diseases.cardiovascular", image: card1 },
  { titleKey: "individuals.diseases.depression_anxiety", image: card2 },
  { titleKey: "individuals.diseases.infertility", image: card4 },
  { titleKey: "individuals.diseases.allergies", image: card3 },
  { titleKey: "individuals.diseases.diabetes_type_2", image: card6 },
  { titleKey: "individuals.diseases.male_dysfunction", image: card8 },
  { titleKey: "individuals.diseases.skin_issues", image: card7 },
  { titleKey: "individuals.diseases.autoimmune", image: card5 }
];

// 1. Définition des variantes d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Délai entre chaque mot et chaque carte
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(10px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function FirstIntro() {
  const { t } = useTranslation();

  return (
    <div className="intro-full-wrapper">
      <motion.div 
        className="intro-section first-intro"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // S'anime quand la section apparaît à l'écran
        viewport={{ once: true, amount: 0.2 }} // Ne se joue qu'une fois
      >
        <h1 className="headline">
          {t("individuals.main_title1")
            .split(" ")
            .map((word, i) => (
              <motion.span 
                key={i} 
                variants={itemVariants} 
                style={{ display: "inline-block" }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
        </h1>
        
        <div className="grid_intro">
          {Cards.map((card, index) => (
            <motion.div 
              className="card-intro" 
              key={index}
              variants={itemVariants} // Utilise la même variante pour l'effet une par une
            >
              <img src={card.image} alt="card" />
              <h2>{t(card.titleKey)}</h2>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}