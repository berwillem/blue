import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./JoinUs.module.css";

import PartnerCard from "../../components/PartnerCard/PartnerCard";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { useUserTypeStore } from "../../store/useUserTypeStore";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeIn" },
  },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const JoinUs: React.FC = () => {
  const { t } = useTranslation();

  // On récupère les listes depuis le JSON
  const whyList = t("join.why_blu.list", { returnObjects: true }) as string[];
  const standardsList = t("join.standards.list", { returnObjects: true }) as string[];

const partners = Array.from({ length: 7 }, (_, i) => 
  t(`join.partners_section.card_label${i + 1}`)
);
const partners1 = partners.slice(0, 4); 
const partners2 = partners.slice(4);
  const userType = useUserTypeStore((state) => state.userType);

  return (
    <div className={styles.pageWrapper} id="joinus">
      

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <motion.header
          className={styles.hero}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariant}
        >
          <SectionHeader overline={t("join.hero.overline")} />
          <h1 className={styles.mainTitle}>{t("join.hero.title")}</h1>
          <p className={styles.leadText}>{t("join.hero.p1")}</p>
          <p className={styles.leadText}>{t("join.hero.p2")}</p>
        </motion.header>

        {/* Grid Section */}
        <motion.section
          className={styles.gridSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariant}
        >
          <motion.div variants={fadeInVariant}>
            <SectionHeader
              overline={t("join.partners_section.overline")}
              title={t("join.partners_section.title")}
            />
          </motion.div>

          <div style={{display:"flex",flexDirection:userType=="individuals" ? "column": "column-reverse"}}>
                 <motion.ul  variants={fadeInVariant} className={styles.list}>
            {partners1.map((title, idx) => (
         
                <li key={idx}>{title}</li>
         
            ))}
                 </motion.ul>
                 <motion.ul  variants={fadeInVariant} className={styles.list}>
            {partners2.map((title, idx) => (
         
                <li key={idx}>{title}</li>
         
            ))}
                 </motion.ul>
          </div>
        </motion.section>

        {/* Info Sections */}
        <section className={styles.details}>
          <motion.div
            className={styles.textBlock}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariant}
          >
            <SectionHeader
              overline={t("join.why_blu.overline")}
              title={t("join.why_blu.title")}
            />
            <p className={styles.listLabel}>{t("join.why_blu.label")}</p>
            <ul className={styles.list}>
              {whyList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </motion.div>

          <motion.div
            className={styles.textBlock}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariant}
          >
            <SectionHeader overline={t("join.standards.overline")} />
            <p className={styles.listLabel}>{t("join.standards.label")}</p>
            <ul className={styles.list}>
              {standardsList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className={styles.italicNote}>{t("join.standards.footer")}</p>
          </motion.div>
        </section>
      </main>

      <motion.footer
        className={styles.footer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariant}
      >
        <SectionHeader overline={t("join.cta.overline")} />
        <p className={styles.ctaText}>{t("join.cta.text")}</p>
        <Link to="/partnerform">
          <button className={styles.btnLarge}>
          {t("join.cta.button")}
        </button>
        </Link>
      
      </motion.footer>
   
    </div>
  );
};

export default JoinUs;