import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import { useTranslation } from 'react-i18next'; // Import de useTranslation

const Contact = () => {
  const { t } = useTranslation(); // Initialisation de la traduction
  const userType = useUserTypeStore((state) => state.userType);
  
  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "joinus",path:userType=="individuals" ? "/individuals#joinus": "/corporates#joinus"  },
    { name: "privacy", path: "/privacy" },
  ];


  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="contact-container">
      <Navbar links={links}/>
      
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <header className="contact-header">
          <span className="contact-label">{t("contact.header.label")}</span>
          <h1 className="contact-title">
            {t("contact.header.title")}
          </h1>
        </header>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <section className="form-section">
            <div className="input-group">
              <label>{t("contact.form.name_label")}</label>
              <input type="text" placeholder={t("contact.form.name_placeholder")} />
            </div>
            <div className="input-group">
              <label>{t("contact.form.phone_label")}</label>
              <input type="text" placeholder={t("contact.form.phone_placeholder")} />
            </div>
            <div className="input-group">
              <label>{t("contact.form.concerns_label")}</label>
              <textarea placeholder={t("contact.form.concerns_placeholder")} />
            </div>
          </section>

          <section className="form-section">
            <div className="consent-group">
              <input type="checkbox" id="consent" />
              <label htmlFor="consent" className="consent-text">
                {t("contact.form.consent")}
              </label>
            </div>
          </section>

          <button type="submit" className="submit-button">
            {t("contact.form.submit_button")}
          </button>
          
          <p className="disclaimer">
            {t("contact.form.disclaimer")}
          </p>
        </form>
      </motion.main>

      <Footer/>
    </div>
  );
};

export default Contact;