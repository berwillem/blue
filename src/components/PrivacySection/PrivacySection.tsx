import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './PrivacySection.module.css';

const PrivacySection: React.FC = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        
        {/* TITRE PRINCIPAL */}
        <h1 className={`${styles.title} ${styles.fadeIn} ${styles.delay1}`}>
          {t("privacy_section.title")}
        </h1>

        {/* SECTION TOUJOURS VISIBLE */}
        <section className={`${styles.textSection} ${styles.fadeIn} ${styles.delay2}`}>
          <p>
            {t("privacy_section.main_text")}
          </p>
          <span className={styles.signature}>-Redha</span>
        </section>

        {/* CONTENU ACCORDÉON (ANIME) */}
        <AnimatePresence>
          {showMore && (
            <motion.section 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={styles.textSection}
              style={{ overflow: 'hidden' }}
            >
              <p style={{ marginBottom: '1rem' }}>
                {t("privacy_section.paragraph1")}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                {t("privacy_section.paragraph2")}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                {t("privacy_section.paragraph3")}
              </p>
              
              <Link className={styles.Link} to="/privacy">
                {t("privacy_section.link_more")}
              </Link>
            </motion.section>
          )}
        </AnimatePresence>

        {/* BOUTON D'ACTION */}
        <div className={`${styles.buttonContainer} ${styles.fadeIn} ${styles.delay4}`}>
          <button 
            className={styles.ctaButton} 
            onClick={() => setShowMore(!showMore)}
          >
            {showMore 
              ? t("privacy_section.show_less") 
              : t("privacy_section.show_more")}
          </button>
        </div>

      </main>
    </div>
  );
};

export default PrivacySection;