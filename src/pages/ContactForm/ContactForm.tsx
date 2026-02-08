import React from 'react';
import './ContactForm.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import { useTranslation } from 'react-i18next'; // Import i18n
import { motion } from 'framer-motion';

const ContactForm = () => {
  const { t } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);
  
  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
    { name: "privacy", path: "/privacy" },
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="contact-container">
      <Navbar links={links} />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <header className="contact-header">
          <span className="contact-label">{t("contactForm.header.label")}</span>
          <h1 className="contact-title">
            {t("contactForm.header.title")}
          </h1>
        </header>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          {/* Section 1: Organization */}
          <section className="form-section">
            <h2 className="section-title">{t("contactForm.sections.org_details")}</h2>
            <div className="input-group">
              <label>{t("contactForm.form.company_name")}</label>
              <input type="text" placeholder={t("contactForm.form.company_name")} />
            </div>
            <div className="input-group">
              <label>{t("contactForm.form.industry")}</label>
              <input type="text" placeholder={t("contactForm.form.industry")} />
            </div>
            <div className="input-group">
              <label>{t("contactForm.form.size")}</label>
              <input type="text" placeholder={t("contactForm.form.size")} />
            </div>
          </section>

          {/* Section 2: Contact */}
          <section className="form-section">
            <h2 className="section-title">{t("contactForm.sections.primary_contact")}</h2>
            <div className="input-group">
              <label>{t("contactForm.form.full_name")}</label>
              <input type="text" placeholder={t("contactForm.form.full_name")} />
            </div>
            <div className="input-group">
              <label>{t("contactForm.form.role")}</label>
              <input type="text" placeholder={t("contactForm.form.role")} />
            </div>
            <div className="input-group">
              <label>{t("contactForm.form.email")}</label>
              <input type="email" placeholder={t("contactForm.form.email")} />
            </div>
            <div className="input-group">
              <label>{t("contactForm.form.phone")}</label>
              <input type="tel" placeholder={t("contactForm.form.phone")} />
            </div>
          </section>

          {/* Section 3: Objectives */}
          <section className="form-section">
            <h2 className="section-title">{t("contactForm.sections.objectives")}</h2>
            <div className="input-group">
              <label>{t("contactForm.form.services_interest")}</label>
              <select>
                <option>{t("contactForm.form.select_service")}</option>
                <option>{t("contactForm.form.options.governance")}</option>
                <option>{t("contactForm.form.options.financial")}</option>
                <option>{t("contactForm.form.options.strategy")}</option>
                <option>{t("contactForm.form.options.leadership")}</option>
              </select>
            </div>
            
            <div className="consent-group">
              <input type="checkbox" id="consent" />
              <label htmlFor="consent" className="consent-text">
                {t("contactForm.form.consent")}
              </label>
            </div>
          </section>

          <button type="submit" className="submit-button">{t("contactForm.form.submit")}</button>
          
          <p className="disclaimer">
            {t("contactForm.form.disclaimer")}
          </p>
        </form>
      </motion.main>

      <Footer />
    </div>
  );
};

export default ContactForm;