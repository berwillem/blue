import React from "react";
import styles from "./JoinUs.module.css";

import PartnerCard from "../../components/PartnerCard/PartnerCard";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const JoinUs: React.FC = () => {
  const partners = Array(7).fill(
    "Medical Doctors & Licensed Health Practitioners",
  );
  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "why_us", path: "#" },
    { name: "services", path: "#" },
  ];
  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <Navbar links={links} />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <SectionHeader overline="Join us as a partner" />
          <h1 className={styles.mainTitle}>
            Not everyone should join us. And that is intentional.
          </h1>
          <p className={styles.leadText}>
            Blu partners with experienced professionals who understand that
            sustained health, performance, and decision-making require
            structure, discipline, and professional accountability — not trends
            or shortcuts.
          </p>
          <p className={styles.leadText}>
            If you are committed to verifiable results, long-term
            responsibility, and ethical practice, you may belong here.
          </p>
        </header>

        {/* Grid Section */}
        <section className={styles.gridSection}>
          <SectionHeader
            overline="Who We Partner With ?"
            title="We collaborate with experienced professionals who want to expand their impact without compromising their standards:"
          />
          <div className={styles.grid}>
            {partners.map((title, idx) => (
              <PartnerCard key={idx} title={title} />
            ))}
          </div>
        </section>

        {/* Info Sections */}
        <section className={styles.details}>
          <div className={styles.textBlock}>
            <SectionHeader
              overline="Why Partner With Blu."
              title="This is not a referral scheme. It's a professional collaboration"
            />
            <p className={styles.listLabel}>As a partner, you gain:</p>
            <ul className={styles.list}>
              <li>
                A structured working environment aligned with professional
                standards
              </li>
              <li>
                Access to cross-disciplinary peers operating under clear
                boundaries
              </li>
              <li>Professional alignment with a serious, selective platform</li>
              <li>
                The ability to contribute meaningfully in complex,
                high-responsibility cases
              </li>
              <li>
                Long-term professional value, not transactional engagement
              </li>
            </ul>
          </div>

          <div className={styles.textBlock}>
            <SectionHeader overline="Our Standards" />
            <p className={styles.listLabel}>
              We work only with professionals who:
            </p>
            <ul className={styles.list}>
              <li>
                Accept personal accountability for their role and decisions
              </li>
              <li>Respect competence boundaries and scope of practice</li>
              <li>
                Operate with confidentiality, discretion, and ethical rigor
              </li>
              <li>Prefer accuracy over convenience</li>
              <li>Are willing to be evaluated and held to high standards</li>
            </ul>
            <p className={styles.italicNote}>
              If that resonates, we should talk.
            </p>
          </div>
        </section>
      </main>

      {/* Footer CTA */}
      <footer className={styles.footer}>
        <SectionHeader overline="Start the Conversation" />
        <p className={styles.ctaText}>
          If you believe your expertise belongs in a serious, disciplined, and
          purpose-driven alliance, we invite you to apply.
        </p>
        <Link to="/partnerform">
          <button className={styles.btnLarge}>
            Apply to Become a Blu. Partner
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default JoinUs;
