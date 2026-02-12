"use client"

import CustomCursor from "@/components/common/CustomCursor";
import StarsCanvas from "@/components/common/StarCanvas";
import { useT } from "@/hooks/useT";
import { useTitle } from "@/hooks/useTitle";

import '@/styles/pages/Contact.css'
import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

export default function Page() {
  const { t } = useT();
  useTitle(`${t("contact.page-title")} | Loïs Alirol`);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // On efface l'erreur précédente lors d'une nouvelle tentative

    const lastSent = localStorage.getItem("5GDBhf63Bdfhey63Gfhst9Y27RKslfbzg53hfj?/jfye.urfn");
    const now = Date.now();

    if (lastSent && now - Number(lastSent) < 86400000) {
      setErrorMessage(t("contact.wait-before-message"));
      return;
    }

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setErrorMessage(t("contact.captcha-incomplete"));
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        'service_32att7n',
        'template_9d4fk6r',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          "g-recaptcha-response": token,
        },
        'PNSOWKX7PAEfELwwa'
      );

      localStorage.setItem("5GDBhf63Bdfhey63Gfhst9Y27RKslfbzg53hfj?/jfye.urfn", now.toString());
      recaptchaRef.current?.reset();
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error(error);
      setStatus('idle');
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const items = document.querySelectorAll('.animate-item');

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    items.forEach((item) => observerRef.current?.observe(item));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <StarsCanvas />
      <main className="contact-page">
        <h1 className="contact-title">{t("contact.title")}</h1>
        <p className="contact-description">{t("contact.description")}</p>

        <section className="contact-columns-container">
          <div className="column column-left animate-item">
            <h3 className="section-header">{t("contact.form-header")}</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder={t("contact.name-placeholder")} 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder={t("contact.email-placeholder")} 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <textarea 
                  name="message" 
                  placeholder={t("contact.message-placeholder")} 
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <ReCAPTCHA
                  sitekey="6LdhG2ksAAAAADAs42AE9O9WO5VJcjQu0P3_7cR1"
                  ref={recaptchaRef}
                />
              </div>

              {errorMessage && (
                <div className="error-message">
                  <span className="error-icon">!</span>
                  {errorMessage}
                </div>
              )}

              <button type="submit" className={`submit-btn ${status}`}>
                {status === 'sending' ? t("contact.sending") 
                 : status === 'success' ? t("contact.sent") 
                 : t("contact.submit")}
              </button>
            </form>
          </div>

          <div className="column column-right animate-item">
            <h3 className="section-header">{t("contact.info-header")}</h3>
            <p className="info-text">{t("contact.info-text")}</p>
            
            <div className="contact-details">
                <div className="detail-item">
                    <span className="label">{t("contact.email-label")}</span>
                    <a href="mailto:lois.alirol.pro@gmail.com" className="value email-marker">
                        lois.alirol.pro@gmail.com
                    </a>
                </div>

                <div className="detail-item">
                    <span className="label">{t("contact.location-label")}</span>
                    <span className="value">{t("contact.location-value")}</span>
                </div>

                <div className="detail-item">
                    <span className="label">{t("contact.response-time-label")}</span>
                    <span className="value">{t("contact.response-time-value")}</span>
                </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};