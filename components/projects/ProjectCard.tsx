import React from 'react';
import Image from 'next/image';
import '@/styles/components/projects/ProjectCard.css';
import { useTransition } from '@/hooks/useTransition';

interface ProjectProps {
  project: {
    id: string;
    title: string;
    image: string;
    description: string;
    link?: string;
    linkLabel?: string;
  };
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  const { navigateWithTransition } = useTransition();

  const handleCardClick = () => {
    navigateWithTransition(`/projects/${project.id}`);
  };

  return (
    <div 
      className="project-item" 
      onClick={handleCardClick}
      data-cursor="pointer"
    >
      <div className="project-image">
        <Image src={project.image} alt={project.title} fill className="project-img" />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;