// @ts-nocheck
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { incrementB2C } from "../../services/statsService";

const Contact = () => {
  const { t } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const links = [
    { name: "home", path: "/" },
    {
      name: "about",
      path: userType === "individuals" ? "/individuals" : "/corporates",
    },
    { name: "services", path: "#" },
    { name: "privacy", path: "/privacy" },
    {
      name: "joinus",
      path: userType === "individuals" ? "/individuals#joinus" : "/joinus",
    },
  ];

  const validatePhone = (phone) => {
    // Accepte le format international (+33...), les espaces, tirets et parenthèses
    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    return phoneRegex.test(phone);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const phoneNumber = formData.get("user_phone");
    const hasConsented = formData.get("consent");

    if (!validatePhone(phoneNumber)) {
      toast.error(t("contact.form.error_phone"));
      return;
    }

    if (!hasConsented) {
      toast.warning(t("contact.form.error_consent"));
      return;
    }

    setLoading(true);

    const SERVICE_ID = "blu_path_service";
    const TEMPLATE_ID = "template_j25pta9";
    const PUBLIC_KEY = "S2Yyu_AWtznhKDE3H";

    try {
      // 1️⃣ Send Email
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY,
      );

      // 2️⃣ Increment B2C stat
      incrementB2C().catch((err) => console.error("Stats error:", err));

      toast.success(t("contact.form.success_msg"));
      formRef.current.reset();
    } catch (error) {
      toast.error(t("contact.form.error_msg"));
      console.error("Erreur EmailJS:", error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="contact-container">
      <Navbar links={links} />

      {/* Container pour les notifications Toastify */}
      <ToastContainer position="bottom-right" theme="dark" />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ marginBottom: "100px" }}
      >
        <header className="contact-header">
          <span className="contact-label">{t("contact.header.label")}</span>
          <h1 className="contact-title">{t("contact.header.title")}</h1>
        </header>

        <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
          {/* Champ masqué pour le template EmailJS */}
          <input
            type="hidden"
            name="page_type"
            value={
              userType === "individuals" ? "Particulier" : "Business/Elite"
            }
          />

          <section className="form-section">
            <div className="input-group">
              <label>{t("contact.form.name_label")}</label>
              <input
                type="text"
                name="user_name"
                placeholder={t("contact.form.name_placeholder")}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("contact.form.phone_label")}</label>
              <input
                type="tel"
                name="user_phone"
                placeholder={t("contact.form.phone_placeholder")}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("contact.form.concerns_label")}</label>
              <textarea
                name="message"
                placeholder={t("contact.form.concerns_placeholder")}
                required
              />
            </div>
          </section>

          <section className="form-section">
            <div className="consent-group">
              <input type="checkbox" id="consent" name="consent" />
              <label htmlFor="consent" className="consent-text">
                {t("contact.form.consent")}
              </label>
            </div>
          </section>

          <button
            type="submit"
            className={`submit-button ${loading ? "btn-loading" : ""}`}
            disabled={loading}
          >
            {loading ? "..." : t("contact.form.submit_button")}
          </button>

          <p className="disclaimer">{t("contact.form.disclaimer")}</p>
        </form>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Contact;
