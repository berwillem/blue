import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./JoinUsCompo.module.css";

import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { useUserTypeStore } from "../../../store/useUserTypeStore";
import { SectionHeader } from "../../SectionHeader/SectionHeader";

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

const JoinUsCompo: React.FC = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const userType = useUserTypeStore((state) => state.userType);

  // Données
  const whyList = t("join.why_blu.list", { returnObjects: true }) as string[];
  const standardsList = t("join.standards.list", { returnObjects: true }) as string[];
  const partners = Array.from({ length: 7 }, (_, i) => t(`join.partners_section.card_label${i + 1}`));
  const partners1 = partners.slice(0, 4);
  const partners2 = partners.slice(4);

  return (
    <div className={styles.pageWrapper} id="joinus">
      <main className={styles.mainContent}>
        {/* Hero Section - TOUJOURS VISIBLE */}
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
        </motion.header>

        {/* CONTENU CACHÉ (SHOW MORE) */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className={styles.leadText} style={{ marginBottom: "2rem" }}>
                {t("join.hero.p2")}
              </p>

              {/* Grid Section */}
              <motion.section className={styles.gridSection} variants={containerVariant}>
                <SectionHeader
                  overline={t("join.partners_section.overline")}
                  title={t("join.partners_section.title")}
                />
                <div style={{ display: "flex", flexDirection: userType === "individuals" ? "column" : "column-reverse" }}>
                  <ul className={styles.list}>
                    {partners1.map((title, idx) => <li key={idx}>{title}</li>)}
                  </ul>
                  <ul className={styles.list}>
                    {partners2.map((title, idx) => <li key={idx}>{title}</li>)}
                  </ul>
                </div>
              </motion.section>

              {/* Info Sections */}
              <section className={styles.details}>
                <div className={styles.textBlock}>
                  <SectionHeader overline={t("join.why_blu.overline")} title={t("join.why_blu.title")} />
                  <p className={styles.listLabel}>{t("join.why_blu.label")}</p>
                  <ul className={styles.list}>
                    {whyList.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div className={styles.textBlock}>
                  <SectionHeader overline={t("join.standards.overline")} />
                  <p className={styles.listLabel}>{t("join.standards.label")}</p>
                  <ul className={styles.list}>
                    {standardsList.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <p className={styles.italicNote}>{t("join.standards.footer")}</p>
                </div>
              </section>

              {/* CTA Footer */}
              <footer className={styles.footer}>
                <SectionHeader overline={t("join.cta.overline")} />
                <p className={styles.ctaText}>{t("join.cta.text")}</p>
                <Link to="/partnerform">
                  <button className={styles.btnLarge}>{t("join.cta.button")}</button>
                </Link>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOUTON TOGGLE (Placé après le paragraphe 1) */}
        <div style={{ display: "flex",  marginTop: "1rem" }}>
          <button 
            onClick={() => setShowMore(!showMore)} 
            className={styles.ctaButtonSimple}
            style={{
                background: "none",
                border: "none",
                  color: "#002b49",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "1rem"
            }}
          >
            {showMore ? t("privacy_section.show_less") : t("privacy_section.show_more")}
          </button>
        </div>
      </main>

      <Link to={userType === "individuals" ? "/contact" : "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
};

export default JoinUsCompo;