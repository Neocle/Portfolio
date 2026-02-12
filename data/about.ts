export interface AboutDomain {
  id: string;
  title: string;
  description: string;
  techs: string[];
}

export interface SoftSkillItem {
  id: string;
  title: string;
  description: string;
}

export interface EducationItem {
  id: string;
  title: string;
  school: string;
  period: string;
  details?: string;
}

export const getAboutDomains = (t: (key: string) => string): AboutDomain[] => [
  {
    id: 'front',
    title: t('about.skills.front.title'),
    description: t('about.skills.front.description'),
    techs: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.JS', 'TailwindCSS'],
  },
  {
    id: 'back',
    title: t('about.skills.back.title'),
    description: t('about.skills.back.description'),
    techs: ['C++', 'Java', 'Java Servlets', 'Node.JS', 'Python', 'REST API'],
  },
  {
    id: 'db',
    title: t('about.skills.databases.title'),
    description: t('about.skills.databases.description'),
    techs: ['SQL', 'PL-SQL', 'MySQL', 'SQLite', 'H2 Database'],
  },
  {
    id: 'tooling',
    title: t('about.skills.tooling.title'),
    description: t('about.skills.tooling.description'),
    techs: ['Git', 'GitHub', 'Bash / Shell', 'Maven', 'Gradle'],
  },
];

export const getAboutSoftSkills = (t: (key: string) => string): SoftSkillItem[] => [
  {
    id: 'soft-1',
    title: t('about.softskills.1.title'), 
    description: t('about.softskills.1.description'), 
  },
  {
    id: 'soft-2',
    title: t('about.softskills.2.title'),
    description: t('about.softskills.2.description'),
  },
  {
    id: 'soft-3',
    title: t('about.softskills.3.title'),
    description: t('about.softskills.3.description'),
  },
];

export const getAboutEducation = (t: (key: string) => string): EducationItem[] => [
  {
    id: 'edu-1',
    title: t('about.education.1.title'),
    school: t('about.education.1.school'),
    period: "2025-2028",
    details: t('about.education.1.details'),
  },
  {
    id: 'edu-2',
    title: t('about.education.2.title'),
    school: t('about.education.2.school'),
    period: "2022-2025",
    details: t('about.education.2.details'),
  },
];