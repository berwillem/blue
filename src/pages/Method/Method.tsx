//@ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";

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
}

const wordVariants: Variants = {
  hidden: { opacity: 0.2 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 } 
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delayOffset, className = "reveal-text-auto", as = "p" }) => {
  const words = text.split(" ");
  const Tag = motion[as];

  const containerVariants: Variants = {
    visible: {
      transition: {
        delayChildren: delayOffset,
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <Tag 
      className={className}
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



const firstSection = sectionsData[0];
console.log('====================================');
console.log(firstSection.button);
console.log('====================================');
  return (
    <div className="about-container">
      <Navbar links={links} />
      <div className="about-content">

        <div className="left">
          
          {/* Petit titre ajouté ici */}
          <AnimatedText 
            as="h3"
            key={`title-${i18n.language}`}
            delayOffset={0}
            className="small-title-about"
            text={firstSection.title} 
            style={{ marginBottom: "1rem", color: "#ffcc00", fontWeight: "bold" }}
          />
         
          <AnimatedText 
            key={`p1-${i18n.language}`}
            delayOffset={0.5}
            text={firstSection.leftText} 
          />
          
        

          <motion.div 
            className="button-about"
            key={`btn-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.0, duration: 0.8 }}
          >
          <Link to="/disclaimer/metabolic-health">  <Button text={firstSection.button} width="100%" /></Link>
          </motion.div>
        </div>
      </div>
      
      <Link to={userType=="individuals" ? "/contact": "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}