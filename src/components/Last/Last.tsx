// @ts-nocheck
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // On importe motion
import TestCard from "../../ui/Testcard/TestCard";
import "./Last.css";
import psyimg from "../../assets/images/testpsy.jpg";

// 1. Définition des variantes pour le container (le parent)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Délai de 0.3s entre l'apparition de chaque carte
    },
  },
};

// 2. Définition des variantes pour chaque carte (l'enfant)
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    filter: "blur(10px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

export default function Last() {
  const { t } = useTranslation();

  return (
    <div className="last-container">
      <div className="texts">
        <h1>{t("last.title")}</h1>
        <p>{t("last.description")}</p>
      </div>

      {/* 3. On transforme la div en motion.div et on applique les variants */}
      <motion.div 
        className="cards"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // L'animation se déclenche quand on voit les cartes
        viewport={{ once: true, amount: 0.2 }} // Se joue une seule fois
      >
        <motion.div variants={cardVariants}>
          <TestCard 
            link="personal-capacity" 
            img={psyimg} 
            title={t("last.card1.title")} 
            desc={t("last.card1.desc")} 
          />
        </motion.div>

        <motion.div variants={cardVariants}>
          <TestCard 
            link="metabolic-health" 
            img={psyimg} 
            title={t("last.card2.title")} 
            desc={t("last.card2.desc")} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}