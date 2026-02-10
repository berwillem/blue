// @ts-nocheck
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Ajout
import styles from './PartnerForm.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

const PartnerForm: React.FC = () => {
  const { t } = useTranslation(); // Hook i18n
  const userType = useUserTypeStore((state) => state.userType);
  const [professionalStatus, setProfessionalStatus] = useState('');

  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "joinus",path:userType=="individuals" ? "/individuals#joinus": "/corporates#joinus"  },
    { name: "privacy", path: "/privacy" },
  ];


  // On compare avec la clé "Other" du JSON
  const showNextSections = professionalStatus === 'Other';

  return (
    <div className={styles.formPage}>
      <Navbar links={links} />
      <header className={styles.header}>
        <p className={styles.overline}>{t('partner_form.overline')}</p>
        <h1 className={styles.title}>{t('partner_form.main_title')}</h1>
      </header>

      <form className={styles.form}>
        {/* Section 1 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.id.title')}</h2>
          <div className={styles.field}>
            <label>{t('partner_form.sections.id.name')}</label>
            <input type="text" placeholder={t('partner_form.sections.id.name')} />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.id.profession')}</label>
            <input type="text" placeholder={t('partner_form.sections.id.profession_placeholder')} />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.id.exp')}</label>
            <div className={styles.radioGroup}>
              {t('partner_form.sections.id.years', { returnObjects: true }).map((year: string) => (
                <label key={year} className={styles.radioLabel}>
                  <input type="radio" name="experience" value={year} /> {year}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.credentials.title')}</h2>
          <div className={styles.field}>
            <label>{t('partner_form.sections.credentials.status')}</label>
            <div className={styles.radioGroup}>
              {Object.entries(t('partner_form.sections.credentials.status_list', { returnObjects: true })).map(([key, label]) => (
                <label key={key} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="status" 
                    value={key} // On stocke la clé (ex: 'other') au lieu du label traduit pour la logique
                    onChange={(e) => setProfessionalStatus(e.target.value)} 
                  /> {label}
                </label>
              ))}
            </div>
          </div>
          {professionalStatus === 'other' && ( // Logique basée sur la clé
            <div className={styles.field}>
              <label>{t('partner_form.sections.credentials.expertise')}</label>
              <input type="text" placeholder={t('partner_form.sections.credentials.expertise_placeholder')} />
            </div>
          )}
        </section>

        {/* Section 3 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('partner_form.sections.intent.title')}</h2>
          <div className={styles.field}>
            <label>{t('partner_form.sections.intent.reason')}</label>
            <textarea placeholder={t('partner_form.sections.intent.reason_placeholder')} rows={5} />
          </div>
          <div className={styles.field}>
            <label>{t('partner_form.sections.intent.contribution')}</label>
            <input type="text" placeholder={t('partner_form.sections.intent.contribution_placeholder')} />
          </div>
        </section>

        {/* Section 4 */}
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
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>{t('partner_form.submit')}</button>
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