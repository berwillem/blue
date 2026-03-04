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
  delayOffset: number;
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

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delayOffset, className = "reveal-text-auto", as = "p", style }) => {
  const Tag = motion[as];

  const containerVariants: Variants = {
    visible: {
      transition: {
        delayChildren: delayOffset,
        staggerChildren: 0.08,
      },
    },
  };

  // --- LA LOGIQUE DE TON AUTRE PAGE ADAPTÉE ICI ---
  const renderContent = () => {
    if (!text) return null;

    // Capture les balises strong
    const regex = /(<strong>.*?<\/strong>)/g;
    const splitText = text.split(regex);

    return splitText.map((part, i) => {
      // Si c'est un strong, on utilise dangerouslySetInnerHTML comme dans ton exemple
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

      // Sinon on split par mot pour l'animation classique
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
    <Tag 
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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

  return (
    <div className="about-container method">
      <Navbar links={links} />
      <div className="about-content">
        <div className="left">
          
          <AnimatedText 
            as="h3"
            key={`title-${i18n.language}`}
            delayOffset={0}
            className="small-title-about"
            text={firstSection.title} 
            style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
          />
         
          <AnimatedText 
            key={`p1-${i18n.language}`}
            delayOffset={0.5}
            text={firstSection.leftText} 
          />
          <AnimatedText 
            key={`p2-${i18n.language}`}
            delayOffset={2}
            text={firstSection.rightDesc} 
          />
          {firstSection.moreContent?.paragraphs?.map((para, idx) => (
            <AnimatedText 
              key={`p-extra-${i18n.language}-${idx}`}
              delayOffset={5 + idx * 0.3}
              text={para.text} 
            />
          ))}

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
        </div>
      </div>
      
      <Link to={userType=="individuals" ? "/contact": "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}