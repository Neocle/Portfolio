import React from 'react';
import Image from 'next/image';
import type { Project } from '@/data/projects';
import '@/styles/components/projectdetails/ProjectMiniNavigator.css';
import { useTransition } from '@/hooks/useTransition';
import { useT } from '@/hooks/useT';

interface ProjectMiniNavigatorProps {
  prevProject?: Project | null;
  nextProject?: Project | null;
  getPreviewImage: (project?: Project | null) => string;
  onNavigate?: () => void;
}

const ProjectMiniNavigator: React.FC<ProjectMiniNavigatorProps> = ({
  prevProject,
  nextProject,
  getPreviewImage,
  onNavigate,
}) => {
  const { t } = useT();
  const { navigateWithTransition } = useTransition();
  
  const displayProject = nextProject || prevProject;

  const handleNavigate = (id?: string | number) => {
    if (!id) return;
    onNavigate?.();
    navigateWithTransition(`/projects/${id}`);
  };

  if (!displayProject) return null;

  return (
    <div className="project-mini-navigator" aria-label="Navigation projets">
      <div
        className="mini-thumb"
        onClick={() => handleNavigate(displayProject.id)}
        role="button"
        tabIndex={0}
      >
        {getPreviewImage(displayProject) ? (
          <Image
            src={getPreviewImage(displayProject)}
            alt={displayProject.title}
            fill
            className="mini-thumb-image"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="mini-thumb-fallback">•</div>
        )}
      </div>

      <div className="mini-meta">
        <small>{t("projects.project.nextProject")}</small>
        <span>{displayProject.title}</span>
      </div>

      <div className="mini-arrows">
        <button
          className="mini-arrow"
          onClick={() => handleNavigate(prevProject?.id)}
          aria-label={
            prevProject
              ? `Projet précédent : ${prevProject.title}`
              : 'Pas de projet précédent'
          }
          disabled={!prevProject}
        >
          ←
        </button>

        <button
          className="mini-arrow"
          onClick={() => handleNavigate(nextProject?.id)}
          aria-label={
            nextProject
              ? `Projet suivant : ${nextProject.title}`
              : 'Pas de projet suivant'
          }
          disabled={!nextProject}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ProjectMiniNavigator;
