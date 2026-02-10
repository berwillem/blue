import React from 'react';
import styles from './PrivacySection.module.css';

const PrivacySection: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        
        <h1 className={`${styles.title} ${styles.fadeIn} ${styles.delay1}`}>
          Your Privacy is Our Priority
        </h1>

        <section className={`${styles.textSection} ${styles.fadeIn} ${styles.delay2}`}>
          <p>
            At Blu., we deeply respect your privacy. Everything you share with us stays strictly confidential. 
            We never disclose personal details, and your information is used only to support your wellness journey. 
            You can trust us to protect your personal life with the utmost care and discretion.
          </p>
          <span className={styles.signature}>-Redha</span>
        </section>

        <section className={`${styles.textSection} ${styles.fadeIn} ${styles.delay3}`}>
          <p style={{ marginBottom: '1rem' }}>
            We take the protection of your personal data seriously. Any information you choose to share with us 
            is handled with care, discretion, and confidentiality, and processed only for legitimate, 
            clearly defined purposes related to our professional services.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            We do not disclose personal data to third parties without a valid legal basis, and we apply 
            appropriate technical and organizational measures to safeguard your information against 
            unauthorized access, misuse, or disclosure.
          </p>
          <p>
            Your personal data is processed in accordance with European Union data protection regulations 
            (GDPR) and applicable confidentiality obligations. You may exercise your data protection 
            rights at any time, in line with applicable law.
          </p>
        </section>

        <div className={`${styles.buttonContainer} ${styles.fadeIn} ${styles.delay4}`}>
          <button className={styles.ctaButton}>
            Learn more about our Privacy & Confidentiality Policy
          </button>
        </div>

      </main>
    </div>
  );
};

export default PrivacySection;