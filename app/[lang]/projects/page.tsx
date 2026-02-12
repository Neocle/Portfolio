"use client"

import CustomCursor from "@/components/common/CustomCursor";
import StarsCanvas from "@/components/common/StarCanvas";
import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects } from "@/data/projects";
import { useT } from "@/hooks/useT";
import { useTitle } from "@/hooks/useTitle";

import '@/styles/pages/Projects.css'
import { useEffect, useRef } from "react";

export default function Page() {
  const { t } = useT();
  
  useTitle(`${t("projects.page-title")} | Loïs Alirol`);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const projectList = getProjects(t);

  const leftCol = projectList.filter((_, i) => i % 2 === 0);
  const rightCol = projectList.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    const items = document.querySelectorAll('.project-item');

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px'
    });

    items.forEach((item) => observerRef.current?.observe(item));

    return () => observerRef.current?.disconnect();
  }, []);

return (
    <>
      <CustomCursor />
      <StarsCanvas />
      <main className="projects-page">
        <h1 className="projects-title">{t("projects.title")}</h1>
        <p className="projects-description">{t("projects.description")}</p>

        <section className="projects-columns-container">
          <div className="column column-left">
            {leftCol.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
          <div className="column column-right">
            {rightCol.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      </main>
    </>
  );
};