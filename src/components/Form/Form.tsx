import { useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Form.css";

interface FormInputs {
  [key: string]: string | number | boolean;
}

export default function Form({
  inputs,
  textArea,
}: {
  inputs: FormInputs;
  textArea: FormInputs;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    Object.entries(inputs).forEach(([key, value]) => {
      initial[key] = value?.toString() || "";
    });
    Object.entries(textArea).forEach(([key, value]) => {
      initial[key] = value?.toString() || "";
    });
    return initial;
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Empty check
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        toast.error(`Please fill in the ${key} field.`);
        return;
      }
    }

    // Detect email field
    const emailKey = Object.keys(inputs).find((key) =>
      key.toLowerCase().includes("email"),
    );

    if (emailKey) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData[emailKey])) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

    // ✅ Detect name field dynamically
    const nameKey = Object.keys(inputs).find(
      (key) =>
        key.toLowerCase().includes("name") &&
        !key.toLowerCase().includes("email"),
    );

    // Build EmailJS payload
    const emailData = {
      fullName: nameKey ? formData[nameKey] : "",
      email: emailKey ? formData[emailKey] : "",
      message: Object.keys(textArea)
        .map((key) => formData[key])
        .join("\n"),
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_t395g9p",
        "template_kb4zgxa",
        emailData,
        "2rgG6E-Boye21xMCl",
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          const cleared: { [key: string]: string } = {};
          Object.keys(formData).forEach((key) => (cleared[key] = ""));
          setFormData(cleared);
        },
        (error) => {
          console.error("Email error:", error.text);
          toast.error("Failed to send message. Try again.");
        },
      );
  };

  return (
    <>
      <form ref={formRef} className="form" onSubmit={sendEmail}>
        {Object.entries(inputs).map(([key]) => (
          <div key={key} className="form-group">
            <input
              type={key.toLowerCase().includes("email") ? "email" : "text"}
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              placeholder={key}
              required
            />
          </div>
        ))}

        {Object.entries(textArea).map(([key]) => (
          <div key={key} className="form-group">
            <textarea
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              placeholder={key}
              required
            />
          </div>
        ))}

        <button type="submit">
          <FiCalendar /> Book a call
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
