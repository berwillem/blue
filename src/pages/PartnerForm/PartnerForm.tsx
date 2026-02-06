// @ts-nocheck
import React, { useState } from 'react'; // Ajout de useState
import styles from './PartnerForm.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

const PartnerForm: React.FC = () => {
  const userType = useUserTypeStore((state) => state.userType);
  
  // État pour surveiller la sélection dans la Section 2
  const [professionalStatus, setProfessionalStatus] = useState('');

  const links = [
    { name: "home", path: "/" },
    { name: "about", path: userType == "individuals" ? "/individuals" : "/corporates" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
    { name: "privacy", path: "/privacy" },
  ];

  // La condition : on affiche la suite si "Other" est coché dans la section 2
  const showNextSections = professionalStatus === 'Other';

  return (
    <div className={styles.formPage}>
      <Navbar links={links} />
      <header className={styles.header}>
        <p className={styles.overline}>Become a partner</p>
        <h1 className={styles.title}>
          This form is used solely to assess professional eligibility and alignment for a potential 
          partnership with Blu. Completion of this form does not constitute acceptance, 
          endorsement, or contractual commitment.
        </h1>
      </header>

      <form className={styles.form}>
        {/* Section 1: Identification */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Identification</h2>
          <div className={styles.field}>
            <label>Full name</label>
            <input type="text" placeholder="Full name" />
          </div>
          <div className={styles.field}>
            <label>Primary Profession</label>
            <input type="text" placeholder="e.g. Medical Doctor – General Practice..." />
          </div>
          <div className={styles.field}>
            <label>Years of Professional Practice</label>
            <div className={styles.radioGroup}>
              {['3–5 years', '6–10 years', '11–15 years', '15+ years'].map(year => (
                <label key={year} className={styles.radioLabel}>
                  <input type="radio" name="experience" value={year} /> {year}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Credentials */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Credentials & Scope of Practice</h2>
          <div className={styles.field}>
            <label>Primary Area of Expertise</label>
            <input type="text" placeholder="Short description – max 2 lines" />
          </div>
          <div className={styles.field}>
            <label>Current Professional Status</label>
            <div className={styles.radioGroup}>
              {['Independent practitioner', 'Associate / Partner', 'Consultant / Advisor', 'Academic / Research', 'Other'].map(status => (
                <label key={status} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="status" 
                    value={status} 
                    onChange={(e) => setProfessionalStatus(e.target.value)} // On capture le changement ici
                  /> {status}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* AFFICHAGE CONDITIONNEL : Sections 3, 4 et 5 */}
        {showNextSections && (
          <>
            {/* Section 3: Intent */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Professional Intent</h2>
              <div className={styles.field}>
                <label>Reason for Interest in Partnering with Blu</label>
                <textarea placeholder="(Max 150 words. Do not include patient, client, or identifiable third-party information)." rows={5} />
              </div>
              <div className={styles.field}>
                <label>Type of Professional Contribution Considered</label>
                <input type="text" placeholder="Clinical, advisory, educational, strategic, other — short description" />
              </div>
            </section>

            {/* Section 4: Compliance */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Confidentiality & Ethical Compliance</h2>
              <p className={styles.subtext}>By submitting this form, you confirm that:</p>
              <div className={styles.checkboxGroup}>
                {[
                  "You operate within your licensed scope of practice and professional competence",
                  "You will not disclose patient, client, or sensitive third-party data in this application",
                  "You respect confidentiality, professional secrecy, and ethical obligations",
                  "You understand that any future collaboration is subject to formal review and agreement"
                ].map((text, i) => (
                  <label key={i} className={styles.checkboxLabel}>
                    <input type="checkbox" required /> {text}
                  </label>
                ))}
              </div>
            </section>

     
          </>
        )}
       {/* Section 5: GDPR */}
            <section className={styles.gdprSection}>
              <h2 className={styles.sectionTitle}>Data Protection & GDPR Information</h2>
              <div className={styles.gdprText}>
                <p><strong>Data Controller:</strong> Blu</p>
                <p><strong>Purpose of Processing:</strong> Assessment of professional partnership eligibility</p>
                <p><strong>Legal Basis:</strong> Legitimate interest (GDPR Art. 6(1)(f))</p>
                <p><strong>Data Retention:</strong> Personal data will be retained only for the duration necessary to evaluate the application.</p>
              </div>
              
              <div className={styles.consentBox}>
                <h3 className={styles.consentTitle}>Consent</h3>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" required /> I confirm that the information provided is accurate and professional
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" required /> I consent to the processing of my data
                </label>
              </div>
            </section>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>Submit Application</button>
          <p className={styles.finalNote}>
            Applications are reviewed individually.
          </p>
        </div>
      </form>
      
      <Link to={userType == "individuals" ? "/contact" : "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
};

export default PartnerForm;