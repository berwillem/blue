// @ts-nocheck
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PartnerForm.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PartnerForm: React.FC = () => {
  const { t } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);
  const [professionalStatus, setProfessionalStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const links = [
    { name: "home", path: "/" },
    { name: "about", path: userType == "individuals" ? "/individuals" : "/corporates" },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    { name: "joinus", path: userType == "individuals" ? "/individuals#joinus" : "/joinus" }
  ];

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = "blu_path_service";
    const TEMPLATE_ID = "template_partner_join"; // Crée un nouveau template pour les partenaires
    const PUBLIC_KEY = "S2Yyu_AWtznhKDE3H";

    const formData = new FormData(formRef.current);

    // Construction de l'objet pour EmailJS
    const templateParams = {
      user_name: formData.get("user_name"),
      profession: formData.get("profession"),
      experience: formData.get("experience"),
      expertise: formData.get("expertise"),
      status: professionalStatus,
      status_other: formData.get("status_other") || "N/A",
      reason: formData.get("reason"),
      contribution: formData.get("contribution"),
      page_type: "Partner Application"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success(t('partner_form.success_msg') || "Application sent successfully!");
        formRef.current.reset();
        setProfessionalStatus('');
      })
      .catch((err) => {
        toast.error(t('partner_form.error_msg') || "An error occurred.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.formPage}>
      <Navbar links={links} />
      <ToastContainer position="bottom-right" theme="dark" />
      
      <header className={styles.header}>
        <p className={styles.overline}>{t('partner_form.overline')}</p>
        <h1 className={styles.title}>{t('partner_form.main_title')}</h1>
      </header>

      <form className={styles.form} ref={formRef} onSubmit={sendEmail}>
        {/* Section 1: ID */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.id.title')}</h2>
          <div className={styles.field}>
            <label>{t('partner_form.sections.id.name')}</label>
            <input type="text" name="user_name" placeholder={t('partner_form.sections.id.name')} required />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.id.profession')}</label>
            <input type="text" name="profession" placeholder={t('partner_form.sections.id.profession_placeholder')} required />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.id.exp')}</label>
            <div className={styles.radioGroup}>
              {t('partner_form.sections.id.years', { returnObjects: true }).map((year: string) => (
                <label key={year} className={styles.radioLabel}>
                  <input type="radio" name="experience" value={year} required /> {year}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Credentials */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.credentials.title')}</h2>
          <div className={styles.field}>
            <label>{t('partner_form.sections.credentials.expertise')}</label>
            <input type="text" name="expertise" placeholder={t('partner_form.sections.credentials.expertise_placeholder')} required />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.credentials.status')}</label>
            <div className={styles.radioGroup}>
              {Object.entries(t('partner_form.sections.credentials.status_list', { returnObjects: true })).map(([key, label]) => (
                <label key={key} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="status_radio" 
                    value={key} 
                    onChange={(e) => setProfessionalStatus(e.target.value)} 
                    required
                  /> {label as string}
                </label>
              ))}
            </div>
          </div>
          {professionalStatus === 'other' && (
            <div className={styles.field}>
              <input type="text" name="status_other" placeholder="..." required />
            </div>
          )}
        </section>

        {/* Section 3: Intent */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.intent.title')}</h2>
          <div className={styles.field}>
            <label>{t('partner_form.sections.intent.reason')}</label>
            <textarea name="reason" placeholder={t('partner_form.sections.intent.reason_placeholder')} rows={5} required />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.intent.contribution')}</label>
            <input type="text" name="contribution" placeholder={t('partner_form.sections.intent.contribution_placeholder')} required />
          </div>
        </section>

        {/* Section 4: Compliance */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.compliance.title')}</h2>
          <p className={styles.subtext}>{t('partner_form.sections.compliance.confirm')}</p>
          <div className={styles.checkboxGroup}>
            {t('partner_form.sections.compliance.checks', { returnObjects: true }).map((text: string, i: number) => (
              <label key={i} className={styles.checkboxLabel}>
                <input type="checkbox" required /> {text}
              </label>
            ))}
          </div>
        </section>

        {/* Section 5: GDPR */}
        <section className={styles.gdprSection}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.gdpr.title')}</h2>
          <div className={styles.gdprText}>
            <p><strong>{t('partner_form.sections.gdpr.controller')}</strong> Blu</p>
            <p><strong>{t('partner_form.sections.gdpr.purpose')}</strong> {t('partner_form.sections.gdpr.purpose_val')}</p>
            <p><strong>{t('partner_form.sections.gdpr.basis')}</strong> {t('partner_form.sections.gdpr.basis_val')}</p>
            <p><strong>{t('partner_form.sections.gdpr.retention')}</strong> {t('partner_form.sections.gdpr.retention_val')}</p>
          </div>
          <div className={styles.consentBox}>
            <h3 className={styles.consentTitle}>{t('partner_form.sections.gdpr.consent')}</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" required /> {t('partner_form.sections.gdpr.check_accurate')}
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" required /> {t('partner_form.sections.gdpr.check_consent')}
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" required /> {t('partner_form.sections.gdpr.check_privacy')}
            </label>
            <Link to="/privacy">
              {t('partner_form.sections.gdpr.check_privacy_link')}
            </Link>
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "..." : t('partner_form.submit')}
          </button>
          <p className={styles.finalNote}>{t('partner_form.final_note')}</p>
        </div>
      </form>

      <Link to={userType == "individuals" ? "/contact" : "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
};

export default PartnerForm;