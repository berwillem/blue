//@ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import "./Method.css";
import Button from "../../ui/button/Button";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: any;
  style?: React.CSSProperties;
}

const wordVariants: Variants = {
  hidden: { opacity: 0.2 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 } 
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "reveal-text-auto", as = "p", style }) => {
  const Tag = motion[as];

  const renderContent = () => {
    if (!text) return null;
    const regex = /(<strong>.*?<\/strong>)/g;
    const splitText = text.split(regex);

    return splitText.map((part, i) => {
      if (part.match(/<strong>/)) {
        return (
          <motion.span 
            key={`strong-${i}`} 
            variants={wordVariants}
            className="word-wrapper"
            dangerouslySetInnerHTML={{ __html: part }} 
            style={{ display: "inline-block" }}
          />
        );
      }

      return part.split(" ").map((word, index) => {
        if (word === "") return null;
        return (
          <span key={`${i}-${index}`} className="word-wrapper">
            <motion.span variants={wordVariants}>
              {word}{" "}
            </motion.span>
          </span>
        );
      });
    });
  };

  return (
    <Tag className={className} style={style}>
      {renderContent()}
    </Tag>
  );
};

export default function Method() {
  const { t, i18n } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);
  
  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    { name: "joinus",path:userType=="individuals" ? "/individuals#joinus": "/joinus"  }
  ];

  const sectionsData = t("individuals.sections", { returnObjects: true }) || [];
  const firstSection = sectionsData[0] || {};

  // Ce variant gère l'enchaînement automatique des paragraphes et listes
  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1, // Délai entre chaque bloc de texte
      },
    },
  };

  return (
    <div className="about-container method">
      <Navbar links={links} />
      <div className="about-content">
        <motion.div 
          className="left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={i18n.language} 
        >
          {/* TITRE */}
          <AnimatedText 
            as="h3"
            className="small-title-about"
            text={firstSection.title} 
            style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
          />
         
          {/* TEXTES PRINCIPAUX */}
          <AnimatedText text={firstSection.leftText} />
          <AnimatedText text={firstSection.rightDesc} />

          {/* PARAGRAPHES SUPPLÉMENTAIRES */}
          {firstSection.moreContent?.paragraphs?.map((para, idx) => (
            <AnimatedText 
              key={`p-extra-${idx}`}
              text={para.text} 
            />
          ))}
      
          {/* LISTES SYNCHRONISÉES */}
          {firstSection.moreContent?.lists?.map((list, idx) => (
            <React.Fragment key={`list-block-${idx}`}>
              <AnimatedText 
                text={list.title} 
                className="list-title"
              />
              <ul style={{ listStyle: "none", padding: 0 }}>
                {list.items.map((item, i) => (
                  <li key={`li-${idx}-${i}`}>
                    <AnimatedText text={item} />
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}

          {/* BOUTON (Animation d'origine préservée) */}
          <motion.div 
            className="button-about"
            key={`btn-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <Link to="/disclaimer/metabolic-health">
              <Button text={firstSection.button} width="100%" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <Link to={userType=="individuals" ? "/contact": "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}