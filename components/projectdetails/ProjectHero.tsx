import React from 'react';
import '@/styles/components/projectdetails/ProjectHero.css';
import type { ProjectLink } from '@/data/projects';
import { FaArrowLeft, FaLink } from 'react-icons/fa';
import { useTransition } from '@/hooks/useTransition';
import { useT } from '@/hooks/useT';

interface ProjectHeroProps {
  title: string;
  description: string;
  links?: ProjectLink[];
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ title, description, links }) => {
  const { navigateWithTransition } = useTransition();
  const { t } = useT();
  
  return (
    <section className="project-hero">
      <div className="hero-overlay">
        <div className="hero-content">

          <button
            className="back-btn"
            onClick={() => navigateWithTransition("/projects")}
            aria-label="Go back"
            data-cursor="pointer"
          >
            <FaArrowLeft />
            <span>{t("projects.project.back")}</span>
          </button>

          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{description}</p>

          {links && links.length > 0 && (
            <div className="hero-cta-group">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta"
                  style={{ 
                    backgroundColor: link.color,
                    boxShadow: link.color ? "none" : undefined
                  }}
                  data-cursor="pointer"
                >
                  {link.label}
                  {link.icon ? <link.icon /> : <FaLink/>}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
