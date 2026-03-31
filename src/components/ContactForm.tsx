import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Replace with your Formspree endpoint: https://formspree.io/f/YOUR_ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzvrpez";

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("success");
        setFields({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleCloseModal = () => setStatus("idle");

  return (
    <>
      <form className="contact-right" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={fields.name}
          onChange={handleChange}
          placeholder={t("contact.name")}
          required
        />
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          placeholder={t("contact.email")}
          required
        />
        <input
          type="text"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          placeholder={t("contact.subject")}
        />
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder={t("contact.message")}
          required
        />
        {status === "error" && (
          <p style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
            {t("contact.error")}
          </p>
        )}
        <button
          type="submit"
          className="contact-submit"
          disabled={status === "sending"}
          style={{ opacity: status === "sending" ? 0.6 : 1 }}
        >
          {status === "sending" ? t("contact.sending") : t("contact.send")} →
        </button>
      </form>

      {/* SUCCESS MODAL */}
      {status === "success" && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="modal-tag">{t("contact.modal.tag")}</span>
            <p className="modal-title">{t("contact.modal.title")}</p>
            <p className="modal-sub">{t("contact.modal.sub")}</p>
            <button className="modal-close" onClick={handleCloseModal}>
              {t("contact.modal.close")} →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
