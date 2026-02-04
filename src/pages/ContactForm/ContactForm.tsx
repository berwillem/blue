import React from 'react';
import './ContactForm.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
  const links = [
    { name: "home", path: "/individuals" },
    { name: "about", path: "/about" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
    { name: "privacy", path: "/privacy.pdf", isExternal: true },
  ];
const ContactForm = () => {
  return (
    <div className="contact-container">
        <Navbar links={links}/>
      <header className="contact-header">
        <span className="contact-label">Contact</span>
        <h1 className="contact-title">
          Request an on-site strategic meeting. Share the details below and our team will contact you to arrange a tailored discussion at your premises.
        </h1>
      </header>

      <form className="contact-form">
        <section className="form-section">
          <h2 className="section-title">Organization details</h2>
          <div className="input-group">
            <label>Company name</label>
            <input type="text" placeholder="Company name" />
          </div>
          <div className="input-group">
            <label>Industry / Sector</label>
            <input type="text" placeholder="Industry / Sector" />
          </div>
          <div className="input-group">
            <label>Company size</label>
            <input type="text" placeholder="Company size" />
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Primary contact</h2>
          <div className="input-group">
            <label>Full name</label>
            <input type="text" placeholder="Full name" />
          </div>
          <div className="input-group">
            <label>Role / Position</label>
            <input type="text" placeholder="Role / Position" />
          </div>
          <div className="input-group">
            <label>Professional email address</label>
            <input type="email" placeholder="Professional email address" />
          </div>
          <div className="input-group">
            <label>Professional phone number</label>
            <input type="tel" placeholder="Professional phone number" />
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Your objectives</h2>
          <div className="input-group">
            <label>Which services are you interested in?</label>
            <select>
              <option>Select a service</option>
            </select>
          </div>
          
          <div className="consent-group">
            <input type="checkbox" id="consent" />
            <label htmlFor="consent" className="consent-text">
              I consent to being contacted by Blu regarding my request.
            </label>
          </div>
        </section>

        <button type="submit" className="submit-button">Submit Application</button>
        
        <p className="disclaimer">
          We respect your privacy. Your information will be used solely to respond to your request and retained only for as long as necessary for this purpose. You may request access to, correction, or deletion of your data at any time thru email : xxxxxxx. For more information, please consult our Privacy & Confidentiality Policy.
        </p>
      </form>
      <Footer/>
    </div>
  );
};

export default ContactForm;