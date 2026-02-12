"use client";

import CustomCursor from "@/components/common/CustomCursor";
import StarsCanvas from "@/components/common/StarCanvas";
import Lightbox from "@/components/projectdetails/LightBox";
import ProjectGallery from "@/components/projectdetails/ProjectGallery";
import ProjectHero from "@/components/projectdetails/ProjectHero";
import ProjectMiniNavigator from "@/components/projectdetails/ProjectMiniNavigator";
import ProjectObjectives from "@/components/projectdetails/ProjectObjectives";
import { getProjects, Project } from "@/data/projects";
import { useT } from "@/hooks/useT";
import { useTitle } from "@/hooks/useTitle";

import '@/styles/pages/ProjectDetails.css'
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useT();
  
  const projectList = useMemo(() => getProjects(t), [t]);
  const project = projectList.find(p => p.id.toString() === id);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useTitle(project ? `${project.title} | Loïs Alirol` : t('projects.project.notFound'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { prevProject, nextProject } = useMemo(() => {
    const currentIndex = projectList.findIndex(p => p.id.toString() === id);
    if (currentIndex === -1 || projectList.length === 0) return { prevProject: null, nextProject: null };

    const prev = projectList[(currentIndex - 1 + projectList.length) % projectList.length];
    const next = projectList[(currentIndex + 1) % projectList.length];
    return { prevProject: prev, nextProject: next };
  }, [id, projectList]);

  const getPreviewImage = (proj: Project | null | undefined) =>
    proj?.image || proj?.gallery?.[0] || '';

  if (!project) return null;

  return (
    <>
      <CustomCursor />
      <StarsCanvas />
      
      <main className="project-details-page">
        
        <ProjectHero 
          title={project.title}
          description={project.description}
          links={project.links}
        />

        <div className="details-container">
          
          <div className="grid-2-columns">
            <div className="content-card">
              <h3 className="section-title">{t('projects.project.contextTitle')}</h3>
              <p className="text-justify">{project.context || project.description}</p>
            </div>
            
            <div className="info-sidebar">
              <div className="info-box">
                <h4>{t('projects.project.toolsTitle')}</h4>
                <div className="tags-cloud">
                  {project.tools?.map((tool, i) => (
                    <span key={i} className="tag">{tool}</span>
                  ))}
                </div>
              </div>
              
              {project.academicValidation && (
                <div className="info-box">
                  <h4>{t('projects.project.academicValidationTitle')}</h4>
                  <ul className="check-list">
                    {project.academicValidation.map((item, i) => (
                      <li key={i}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <ProjectObjectives objectives={project.objectives || []} />

          <div className="grid-timeline-layout">
            <div className="timeline-container">
              <h3 className="section-title">{t('projects.project.stagesTitle')}</h3>
              <div className="steps-list">
                {project.stages?.map((stage, i) => (
                  <div key={i} className="step-item">
                    <div className="step-marker"></div>
                    <div className="step-content">
                      <h4>{stage.title}</h4>
                      <p>{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skills-container">
               <h3 className="section-title">{t('projects.project.skillsTitle')}</h3>
               <div className="skills-wrapper">
                 <div className="skill-group">
                   <h4>{t('skills.technical')}</h4>
                   <p>{project.skills?.technical?.join(' • ')}</p>
                 </div>
                 <div className="skill-group">
                   <h4>{t('skills.transversal')}</h4>
                   <p>{project.skills?.transversal?.join(' • ')}</p>
                 </div>
                 <div className="skill-group">
                   <h4>{t('skills.human')}</h4>
                   <p>{project.skills?.human?.join(' • ')}</p>
                 </div>
               </div>
            </div>
          </div>

          <ProjectGallery 
            gallery={project.gallery || []} 
          />

          <section className="conclusion-section">
            <div className="conclusion-card">
              <h3>{t('projects.project.conclusionTitle')}</h3>
              <p>{project.conclusion}</p>
            </div>
          </section>
        </div>
      </main>

      <ProjectMiniNavigator
        prevProject={prevProject}
        nextProject={nextProject}
        getPreviewImage={getPreviewImage}
        onNavigate={() => setSelectedImage(null)}
      />

      <Lightbox 
        imageSrc={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
}
