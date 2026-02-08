import React from 'react';
import { motion } from 'framer-motion'; // Import de motion
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useUserTypeStore } from '../../store/useUserTypeStore';

const Contact = () => {
  const userType = useUserTypeStore((state) => state.userType);
  
  const links = [
    { name: "home", path:"/" },
    { name: "about", path:userType=="individuals" ? "/individuals": "/corporates" },
    { name: "services", path: "#" },
    { name: "joinus", path: "/joinus" },
    { name: "privacy", path: "/privacy" },
  ];

  // Configuration de l'animation
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="contact-container">
      <Navbar links={links}/>
      
      {/* Conteneur animé */}
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <header className="contact-header">
          <span className="contact-label">Book an appointment</span>
          <h1 className="contact-title">
            Share the details below and our team will contact you to arrange a tailored discussion at your convenience.
          </h1>
        </header>

        <form className="contact-form">
          <section className="form-section">
            <div className="input-group">
              <label>First name, nickname, or pseudonym</label>
              <input type="text" placeholder="First name, nickname, or pseudonym" />
            </div>
            <div className="input-group">
              <label>Phone number</label>
              <input type="text" placeholder="Phone number" />
            </div>
            <div className="input-group">
              <label>Briefly describe your concerns</label>
              <textarea placeholder="Please avoid sharing detailed medical information. A brief description is sufficient." />
            </div>
          </section>

          <section className="form-section">
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
      </motion.main>

      <Footer/>
    </div>
  );
};

export default Contact;