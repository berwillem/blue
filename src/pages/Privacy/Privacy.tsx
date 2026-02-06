// @ts-nocheck
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useUserTypeStore } from '../../store/useUserTypeStore';
import Footer from '../../components/Footer/Footer';
import './Privacy.css';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

export default function Privacy() {
  const userType = useUserTypeStore((state) => state.userType);
  const links = [
    { name: "home", path: userType === "individuals" ? "/individuals" : "/corporates" },
    { name: "about", path: "/about" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
     { name: "privacy", path: "/privacy" },
  ];

  return (
    <div className="privacy-page">
      <Navbar links={links} />
      
      <header className="privacy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: October 2025</p>
        </div>
      </header>

      <main className="privacy-content container">
        <aside className="privacy-nav">
          <ul>
            <li><a href="#introduction">1. Introduction</a></li>
            <li><a href="#data-collection">2. Data Collection</a></li>
            <li><a href="#use-of-data">3. Use of Data</a></li>
            <li><a href="#protection">4. Data Protection</a></li>
            <li><a href="#rights">5. Your Rights</a></li>
            <li><a href="#contact">6. Contact Us</a></li>
          </ul>
        </aside>

        <article className="privacy-text">
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>
              Welcome to our Privacy Policy. Your privacy is critically important to us. 
              This document explains how we collect, use, and safeguard your personal information 
              when you visit our platform or use our services.
            </p>
          </section>

          <section id="data-collection">
            <h2>2. Data Collection</h2>
            <p>
              We collect information that you provide directly to us, such as when you create 
              an account, participate in our tests, or contact our support team. This may include:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Test results and metabolic data</li>
              <li>Professional background (for Corporate users)</li>
            </ul>
          </section>

          <section id="use-of-data">
            <h2>3. Use of Data</h2>
            <p>
              Your data allows us to provide personalized recommendations, track your progress 
              over time, and improve our Executive Metabolic Method. We do not sell your personal 
              data to third parties.
            </p>
          </section>

          <section id="protection">
            <h2>4. Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your data. All sensitive 
              information is encrypted and stored on secure servers with restricted access.
            </p>
          </section>

          <section id="rights">
            <h2>5. Your Rights</h2>
            <p>
              Under the GDPR and other privacy laws, you have the right to access, correct, 
              or delete your personal data at any time. You can manage these settings 
              directly from your dashboard.
            </p>
          </section>

          <section id="contact">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our 
              Data Protection Officer at: <strong>privacy@yourbrand.com</strong>
            </p>
          </section>
        </article>
      </main>

      <Footer />
       <Link to={userType=="individuals" ? "/contact": "/contactb2b"} className="buble">
        <FiCalendar />
      </Link>
    </div>
  )
}