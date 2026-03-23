// @ts-nocheck
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import redaabout from "../../assets/images/DSC03683.JPG.jpeg";
import redaabout2 from "../../assets/images//redafounder.png";

import Button from "../../ui/button/Button";
import { useTranslation } from "react-i18next";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

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
  const userType = useUserTypeStore((state) => state.userType);
  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    { name: "joinus",path:userType=="individuals" ? "/individuals#joinus": "/joinus"  }
  ];
  const contactButton = userType === "individuals" ? t("navbar.contact2") : t("navbar.contact");
  const [Isphone, setIsphone] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const checkDevice = () => setIsphone(mediaQuery.matches);
    checkDevice();
    mediaQuery.addEventListener("change", checkDevice);
    return () => mediaQuery.removeEventListener("change", checkDevice);
  }, []);
  return (
    <div className="about-container">
      <Navbar links={links} />
      <div className="about-content">
        <img src={Isphone ? redaabout2 : redaabout} alt="about" />
        <div className="left">
          {/* On utilise i18n.language dans la key pour forcer le re-mount et relancer l'anim au switch de langue */}
          
          <AnimatedText 
            key={`p1-${i18n.language}`}
            delayOffset={0.1}
            text={userType=="individuals" ? t("about.paragraph11") : t("about.paragraph1")} 
          />
          {userType=="individuals" &&  <AnimatedText 
            key={`p2-${i18n.language}`}
            delayOffset={4.0} 
            text={t("about.paragraph2")} 
          />}
         

          <motion.div 
            className="button-about"
            key={`btn-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.0, duration: 0.8 }}
          >
            <Link to={userType=="individuals" ? "/contact": "/contactb2b"}>
              <Button text={contactButton} width="100%" />
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