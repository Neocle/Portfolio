"use client"

import CustomCursor from "@/components/common/CustomCursor";
import StarsCanvas from "@/components/common/StarCanvas";
import { useEffect, useRef } from "react";
import { getAboutDomains, getAboutEducation, getAboutSoftSkills } from "@/data/about";
import { useT } from "@/hooks/useT";
import { useTitle } from "@/hooks/useTitle";

import '@/styles/pages/About.css'

export default function Page() {
  const { t } = useT();
  useTitle(`${t('about.page-title')} | Loïs Alirol`);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll('.animate-item');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((item) => observerRef.current?.observe(item));

    return () => observerRef.current?.disconnect();
  }, []);

  const domains = getAboutDomains(t);
  const softSkills = getAboutSoftSkills(t);
  const education = getAboutEducation(t);

  return (
    <>
      <CustomCursor />
      <StarsCanvas />
      <main className="about-page">
        <h1 className="about-title">{t('about.title')}</h1>
        <p className="about-description">{t('about.description')}</p>

        <h2 className="about-section-title">{t('about.skills.title')}</h2>
        <section className="about-grid">
          {domains.map((domain) => (
            <article key={domain.id} className="about-card animate-item">
              <header className="about-card-header">
                <h3 className="about-card-title">{domain.title}</h3>
                <p className="about-card-desc">{domain.description}</p>
              </header>

              <div className="tech-chips">
                {domain.techs.map((tech) => (
                  <span key={`${domain.id}-${tech}`} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <h2 className="about-section-title">{t('about.softskills.title')}</h2>
        <section className="softskills-grid">
          {softSkills.map((skill) => (
            <div key={skill.id} className="softskill-item animate-item">
              <h3 className="softskill-title">{skill.title}</h3>
              <p className="softskill-desc">{skill.description}</p>
            </div>
          ))}
        </section>

        <h2 className="about-section-title">{t('about.education.title')}</h2>
        <section className="education-timeline">
          {education.map((item) => (
            <article key={item.id} className="timeline-item animate-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="education-header">
                  <h3 className="education-title">{item.title}</h3>
                  <span className="education-date">{item.period}</span>
                </div>
                <p className="education-school">{item.school}</p>
                {item.details && <p className="education-details">{item.details}</p>}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};