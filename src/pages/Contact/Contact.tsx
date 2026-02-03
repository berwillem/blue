import { useTranslation } from "react-i18next";
import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  const links = [
    {
      name: "home",
      path: "/"
    },
    {
      name: "about",
      path: "/about"
    },
    {
      name: "why_us",
      path: "#"
    },
    {
      name: "services",
      path: "#"
    }
  ];

  return (
    <div className="contact-container">
      <Navbar links={links} />
      {/* On passe les traductions en clés d'objets pour que le formulaire 
          affiche les bons labels/placeholders 
      */}
      <Form 
        inputs={{ 
          [t("contact.form.name")]: "", 
          [t("contact.form.email")]: "" 
        }} 
        textArea={{ 
          [t("contact.form.message")]: "" 
        }} 
      />
    </div>
  );
}