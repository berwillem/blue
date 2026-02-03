import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./JoinUs.module.css";

import PartnerCard from "../../components/PartnerCard/PartnerCard";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import Navbar from "../../components/Navbar/Navbar";

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

  const partners = Array(7).fill(t("join.partners_section.card_label"));

  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "why_us", path: "#" },
    { name: "services", path: "#" },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Navbar links={links} />

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

          <div className={styles.grid}>
            {partners.map((title, idx) => (
              <motion.div key={idx} variants={fadeInVariant}>
                <PartnerCard title={title} />
              </motion.div>
            ))}
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
        <button className={styles.btnLarge}>
          {t("join.cta.button")}
        </button>
      </motion.footer>
    </div>
  );
};

export default JoinUs;