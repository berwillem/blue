// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import "./ContactForm.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useUserTypeStore } from "../../store/useUserTypeStore";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { incrementB2B } from "../../services/statsService";

const ContactForm = () => {
  const { t } = useTranslation();
  const userType = useUserTypeStore((state) => state.userType);

  const [industry, setIndustry] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const dropdownRef = useRef(null);

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

  const serviceOptions = [
    { id: "governance", label: t("contactForm.form.options.governance") },
    { id: "financial", label: t("contactForm.form.options.financial") },
    { id: "strategy", label: t("contactForm.form.options.strategy") },
    { id: "leadership", label: t("contactForm.form.options.leadership") },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Validation du numéro de téléphone
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    return phoneRegex.test(phone);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const phoneNumber = formData.get("user_phone");

    if (!validatePhone(phoneNumber)) {
      toast.error(t("contactForm.form.error_phone") || "Invalid phone number");
      return;
    }

    setLoading(true);

    const SERVICE_ID = "blu_path_service";
    const TEMPLATE_ID = "template_vlwn1en";
    const PUBLIC_KEY = "S2Yyu_AWtznhKDE3H";

    const servicesText =
      selectedServices.length > 0
        ? selectedServices
            .map((s) => serviceOptions.find((opt) => opt.id === s)?.label)
            .join(", ")
        : "Aucun service spécifié";

    const templateParams = {
      ...Object.fromEntries(formData),
      selected_services: servicesText,
      page_type: "Corporate / B2B",
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      incrementB2B().catch((err) => console.error("B2B stats error:", err));

      toast.success(t("contactForm.form.success_msg") || "Sent successfully!");

      formRef.current.reset();
      setSelectedServices([]);
      setIndustry("");
    } catch (err) {
      toast.error(t("contactForm.form.error_msg") || "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <Navbar links={links} />
      <ToastContainer position="bottom-right" theme="dark" />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: "100px" }}
      >
        <header className="contact-header">
          <span className="contact-label">{t("contactForm.header.label")}</span>
          <h1 className="contact-title">{t("contactForm.header.title")}</h1>
        </header>

        <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
          <section className="form-section">
            <h2 className="section-title">
              {t("contactForm.sections.org_details")}
            </h2>

            <div className="input-group">
              <label>{t("contactForm.form.company_name")}</label>
              <input
                type="text"
                name="company_name"
                placeholder={t("contactForm.form.company_name")}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("contactForm.form.industry")}</label>
              <select
                name="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              >
                <option value="">{t("contactForm.form.select_option")}</option>
                <option value="manufacturing">
                  {t("contactForm.form.industries.manufacturing")}
                </option>
                <option value="construction">
                  {t("contactForm.form.industries.construction")}
                </option>
                <option value="energy">
                  {t("contactForm.form.industries.energy")}
                </option>
                <option value="healthcare">
                  {t("contactForm.form.industries.healthcare")}
                </option>
                <option value="financial">
                  {t("contactForm.form.industries.financial")}
                </option>
                <option value="technology">
                  {t("contactForm.form.industries.technology")}
                </option>
                <option value="other">
                  {t("contactForm.form.industries.other")}
                </option>
              </select>
            </div>

            <AnimatePresence>
              {industry === "other" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="input-group"
                >
                  <label>{t("contactForm.form.industry_other")}</label>
                  <input
                    type="text"
                    name="industry_custom"
                    placeholder={t(
                      "contactForm.form.industry_other_placeholder",
                    )}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="input-group">
              <label>{t("contactForm.form.size")}</label>
              <select name="company_size" required>
                <option value="">{t("contactForm.form.select_option")}</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="200+">200+</option>
              </select>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">
              {t("contactForm.sections.primary_contact")}
            </h2>
            <div className="input-row">
              <div className="input-group">
                <label>{t("contactForm.form.full_name")}</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder={t("contactForm.form.full_name")}
                  required
                />
              </div>
              <div className="input-group">
                <label>{t("contactForm.form.role")}</label>
                <input
                  type="text"
                  name="user_role"
                  placeholder={t("contactForm.form.role")}
                  required
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>{t("contactForm.form.email")}</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder={t("contactForm.form.email")}
                  required
                />
              </div>
              <div className="input-group">
                <label>{t("contactForm.form.phone")}</label>
                <input
                  type="tel"
                  name="user_phone"
                  placeholder={t("contactForm.form.phone")}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">
              {t("contactForm.sections.objectives")}
            </h2>
            <div className="input-group">
              <label>{t("contactForm.form.services_interest")}</label>
              <div className="custom-multiselect" ref={dropdownRef}>
                <div
                  className={`select-trigger ${isOpen ? "active" : ""}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="placeholder">
                    {selectedServices.length > 0
                      ? `${selectedServices.length} ${t("contactForm.form.selected")}`
                      : t("contactForm.form.select_service")}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`arrow ${isOpen ? "rotated" : ""}`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="select-options"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {serviceOptions.map((opt) => (
                        <label key={opt.id} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(opt.id)}
                            onChange={() => toggleService(opt.id)}
                          />
                          <span className="label-text">{opt.label}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="consent-group">
              <input type="checkbox" id="consent" name="consent" required />
              <label htmlFor="consent" className="consent-text">
                {t("contactForm.form.consent")}
              </label>
            </div>
          </section>

          <button
            type="submit"
            className={`submit-button ${loading ? "btn-loading" : ""}`}
            disabled={loading}
          >
            {loading
              ? t("contactForm.form.sending")
              : t("contactForm.form.submit")}
          </button>
          <p className="disclaimer">{t("contactForm.form.disclaimer")}</p>
        </form>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ContactForm;
