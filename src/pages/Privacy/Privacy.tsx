
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useUserTypeStore } from '../../store/useUserTypeStore';
import Footer from '../../components/Footer/Footer';
import './Privacy.css';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);

  // Au lieu de récupérer l'objet entier, on définit les IDs des sections
  // Cela force i18next à chercher la traduction pour chaque ligne
  const sectionIds = ["1", "2", "3", "4", "9"]; 

  const links = [
    { name: "home", path: "/" },
    { name: "about", path: userType === "individuals" ? "/individuals" : "/corporates" },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    { name: "joinus", path: userType === "individuals" ? "/individuals#joinus" : "/joinus" }
  ];

  return (
    <div className="privacy-page" key={i18n.language}> {/* FORCE le re-render complet quand la langue change */}
      <Navbar links={links} />
      
      <header className="privacy-hero">
        <div className="container">
          <div className="logo-privacy">Blu<span>.</span></div>
          <h1>{t('privacy2.hero_title')}</h1>
          <p>{t('privacy2.last_updated')}: Octobre 2025</p>
        </div>
      </header>

      <main className="privacy-content container">
        <aside className="privacy-nav">
          <ul>
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`#section-${id}`}>{t(`privacy2.sections.${id}.title`)}</a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="privacy-text">
          {sectionIds.map((id) => (
            <section id={`section-${id}`} key={id}>
              <h2>{t(`privacy2.sections.${id}.title`)}</h2>
              <div className="section-body">
                <p>{t(`privacy2.sections.${id}.content`)}</p>
                
                {/* Gestion sécurisée de la liste si elle existe */}
                {Array.isArray(t(`privacy2.sections.${id}.list`, { returnObjects: true })) && (
                  <ul>
                    {(t(`privacy2.sections.${id}.list`, { returnObjects: true }) as string[]).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Footer de section */}
                {t(`privacy2.sections.${id}.footer`) !== `privacy2.sections.${id}.footer` && (
                   <p className="section-footer"><strong>{t(`privacy2.sections.${id}.footer`)}</strong></p>
                )}
              </div>
            </section>
          ))}
          
          <section id="section-contact">
             <h2>13. Contact</h2>
             <p>{t('privacy2.contact_text')} <strong>contact@blu-executive.com</strong></p>
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