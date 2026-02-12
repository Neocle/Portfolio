import projectsData from '@/data/projects.json';

export const PROJECTS = projectsData.projects as readonly string[];
export type Project = (typeof PROJECTS)[number];

export function isValidProject(proj: string): proj is Project {
  return PROJECTS.includes(proj);
}
