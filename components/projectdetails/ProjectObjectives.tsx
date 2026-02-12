import React from 'react';
import '@/styles/components/projectdetails/ProjectObjectives.css';
import { useT } from '@/hooks/useT';

interface ProjectObjectivesProps {
  objectives: string[];
}

const ProjectObjectives: React.FC<ProjectObjectivesProps> = ({ objectives }) => {
  const { t } = useT();

  if (!objectives || objectives.length === 0) return null;

  return (
    <section className="full-width-section">
      <h3 className="section-title center">{t("projects.project.objectives")}</h3>
      <div className="objectives-grid">
        {objectives.map((obj, i) => (
          <div key={i} className="objective-card">
            <span className="obj-number">0{i + 1}</span>
            <p>{obj}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectObjectives;