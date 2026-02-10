// @ts-nocheck
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import Footer from '../../components/Footer/Footer';
import './Privacy.css';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);
  
  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "joinus",path:userType=="individuals" ? "/individuals#joinus": "/corporates#joinus"  },
    { name: "privacy", path: "/privacy" },
  ];


  // Génère dynamiquement les items de la navigation latérale à partir du JSON
  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <div className="privacy-page">
      <Navbar links={links} />
      
      <header className="privacy-hero">
        <div className="container">
          <div className="logo-privacy">Blu<span>.</span></div>
          <h1>{t('privacy.hero_title')}</h1>
          <p>{t('privacy.last_updated')}: Octobre 2025</p>
        </div>
      </header>

      <main className="privacy-content container">
        <aside className="privacy-nav">
          <ul>
            {Object.entries(sections).map(([key, section]) => (
              <li key={key}>
                <a href={`#section-${key}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="privacy-text">
          {Object.entries(sections).map(([key, section]) => (
            <section id={`section-${key}`} key={key}>
              <h2>{section.title}</h2>
              <div className="section-body">
                {/* Affiche le texte principal */}
                {section.content && <p>{section.content}</p>}
                
                {/* Affiche les listes à puces si elles existent */}
                {section.list && (
                  <ul>
                    {section.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Affiche les sous-sections ou notes spécifiques */}
                {section.footer && <p className="section-footer"><strong>{section.footer}</strong></p>}
              </div>
            </section>
          ))}
          
          <section id="section-contact">
             <h2>13. Contact</h2>
             <p>{t('privacy.contact_text')} <strong>contact@blu-executive.com</strong></p>
          </section>
        </article>
      </main>

      <Footer />
      <Link to={userType === "individuals" ? "/contact" : "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  );
}