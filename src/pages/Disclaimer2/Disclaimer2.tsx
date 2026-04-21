import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import Footer from '../../components/Footer/Footer';

import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { useTranslation } from "react-i18next";

export default function Disclaimer2() {
  const { t, i18n } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);

  // Nous avons 3 sections principales dans les textes fournis
  const sectionIds = ["1", "2", "3"]; 

  const links = [
    { name: "home", path: "/" },
    { name: "about", path: userType === "individuals" ? "/individuals" : "/corporates" },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    { name: "joinus", path: userType === "individuals" ? "/individuals#joinus" : "/joinus" }
  ];

  return (
    <div className="privacy-page" key={i18n.language} style={{ overflowX: 'hidden' }}>
      <Navbar links={links} />
      
      <header className="privacy-hero">
        <div className="container">
          <div className="logo-privacy">Blu<span>.</span></div>
          <h1>{t('disclaimer_page.hero_title')}</h1>
          <p style={{marginTop: "10px", fontSize: "1.1rem", opacity: 0.9}}>{t('disclaimer_page.subtitle')}</p>
          <p style={{fontSize: "0.8rem", opacity: 0.6, marginTop: "15px"}}>{t('disclaimer_page.last_updated')}</p>
        </div>
      </header>

      <main className="privacy-content container">
        <aside className="privacy-nav">
          <ul>
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`#section-${id}`}>{t(`disclaimer_page.sections.${id}.title`)}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="privacy-text">
          {sectionIds.map((id) => (
            <section id={`section-${id}`} key={id}>
              <h2>{t(`disclaimer_page.sections.${id}.title`)}</h2>
              
              <p style={{ whiteSpace: 'pre-line' }}>
                {t(`disclaimer_page.sections.${id}.content`)}
              </p>
              
              {Array.isArray(t(`disclaimer_page.sections.${id}.list`, { returnObjects: true })) && (
                <ul style={{ marginTop: '20px' }}>
                  {(t(`disclaimer_page.sections.${id}.list`, { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {t(`disclaimer_page.sections.${id}.footer`) !== `disclaimer_page.sections.${id}.footer` && (
                 <p style={{ marginTop: '25px', fontWeight: '500', color: '#0e3a4a', borderLeft: '3px solid #0e3a4a', paddingLeft: '15px' }}>
                   {t(`disclaimer_page.sections.${id}.footer`)}
                 </p>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
      <Link to={userType === "individuals" ? "/contact" : "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}