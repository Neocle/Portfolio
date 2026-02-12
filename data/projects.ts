import type { IconType } from 'react-icons';
import { FaBook } from 'react-icons/fa';

export interface ProjectLink {
  url: string;
  label: string;
  icon?: IconType;
  color?: string;
}

export interface ProjectStage {
  title: string;
  description: string;
}

export interface ProjectSkills {
  technical: string[];
  transversal: string[];
  human: string[];
}

export interface AcademicResource {
  name: string;
  validated: boolean;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  links?: ProjectLink[];
  category?: string;
  context?: string;
  objectives?: string[];
  tools?: string[];
  stages?: ProjectStage[];
  skills?: ProjectSkills;
  academicValidation?: AcademicResource[];
  conclusion?: string;
  gallery?: string[];
}

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: "flexbans",
    title: 'FlexBans',
    image: '/images/projects/flexbans.webp',
    description: t("projects.flexbans.description"),
    links: [
      {
        url: 'https://builtbybit.com/members/neocle.468042/',
        label: t("projects.flexbans.button"),
      },
      {
        url: 'https://builtbybit.com/members/neocle.468042/',
        label: t("projects.flexbans.documentation-button"),
        icon: FaBook,
        color: "#323232",
      },
    ],

    tools: ['Java', 'React', 'MySQL', 'H2', 'SQLite', 'SQL', 'HTML', 'TypeScript', 'TailwindCSS',],
    context: t("projects.flexbans.context"),
    objectives: [
      t("projects.flexbans.objectives.0"),
      t("projects.flexbans.objectives.1"),
      t("projects.flexbans.objectives.2"),
      t("projects.flexbans.objectives.3"),
    ],
    stages: [
      { title: t("projects.flexbans.stages.0.title"), description: t("projects.flexbans.stages.0.description") },
      { title: t("projects.flexbans.stages.1.title"), description: t("projects.flexbans.stages.1.description") },
      { title: t("projects.flexbans.stages.2.title"), description: t("projects.flexbans.stages.2.description") },
      { title: t("projects.flexbans.stages.3.title"), description: t("projects.flexbans.stages.3.description") },
    ],
    skills: {
      technical: [
        t("projects.flexbans.skills.technical.0"),
        t("projects.flexbans.skills.technical.1"),
        t("projects.flexbans.skills.technical.2"),
        t("projects.flexbans.skills.technical.3"),
      ],
      transversal: [
        t("projects.flexbans.skills.transversal.0"),
        t("projects.flexbans.skills.transversal.1"),
        t("projects.flexbans.skills.transversal.2"),
      ],
      human: [
        t("projects.flexbans.skills.human.0"),
        t("projects.flexbans.skills.human.1"),
      ],
    },
    academicValidation: [
      { name: t("projects.flexbans.academicValidation.0"), validated: true },
      { name: t("projects.flexbans.academicValidation.1"), validated: true },
      { name: t("projects.flexbans.academicValidation.2"), validated: true },
    ],
    conclusion: t("projects.flexbans.conclusion"),
    gallery: [
      '/images/projects/flexbans.webp',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=Dashboard+View',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=In-Game+Menu',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=Database+Schema',
    ],
  },
  {
    id: "img2ascii",
    title: 'Img2Ascii',
    category: t("projects.category"),
    image: '/images/projects/img2ascii.webp',
    description: t("projects.img2ascii.description"),
    links: [
      {
        url: 'https://github.com/Neocle/img2ascii',
        label: t("projects.img2ascii.button"),
      },
    ],

    tools: ['C++', 'CLI'],
    context: t("projects.img2ascii.context"),
    objectives: [
      t("projects.img2ascii.objectives.0"),
      t("projects.img2ascii.objectives.1"),
      t("projects.img2ascii.objectives.2"),
      t("projects.img2ascii.objectives.3"),
    ],
    stages: [
      { title: t("projects.img2ascii.stages.0.title"), description: t("projects.img2ascii.stages.0.description") },
      { title: t("projects.img2ascii.stages.1.title"), description: t("projects.img2ascii.stages.1.description") },
      { title: t("projects.img2ascii.stages.2.title"), description: t("projects.img2ascii.stages.2.description") },
      { title: t("projects.img2ascii.stages.3.title"), description: t("projects.img2ascii.stages.3.description") },
    ],
    skills: {
      technical: [
        t("projects.img2ascii.skills.technical.0"),
        t("projects.img2ascii.skills.technical.1"),
        t("projects.img2ascii.skills.technical.2"),
      ],
      transversal: [
        t("projects.img2ascii.skills.transversal.0"),
      ],
      human: [
        t("projects.img2ascii.skills.human.0"),
        t("projects.img2ascii.skills.human.1"),
      ],
    },
    academicValidation: [
      { name: t("projects.img2ascii.academicValidation.0"), validated: true },
    ],
    conclusion: t("projects.img2ascii.conclusion"),
    gallery: [
      '/images/projects/img2ascii.webp',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=Original+Image',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=ASCII+Output',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=CLI+Usage',
    ],
  },
  {
    id: "ticketbot",
    title: 'Ticket Bot',
    category: t("projects.category"),
    image: '/images/projects/ticketbot.webp',
    description: t("projects.ticketbot.description"),
    links: [
      {
        url: 'https://github.com/Neocle/Ticket-Bot',
        label: t("projects.ticketbot.button"),
      },
    ],

    tools: ['Node.js', 'Discord.js', 'JavaScript', 'SQLite', 'SQL'],
    context: t("projects.ticketbot.context"),
    objectives: [
      t("projects.ticketbot.objectives.0"),
      t("projects.ticketbot.objectives.1"),
      t("projects.ticketbot.objectives.2"),
      t("projects.ticketbot.objectives.3"),
      t("projects.ticketbot.objectives.4"),
    ],
    stages: [
      { title: t("projects.ticketbot.stages.0.title"), description: t("projects.ticketbot.stages.0.description") },
      { title: t("projects.ticketbot.stages.1.title"), description: t("projects.ticketbot.stages.1.description") },
      { title: t("projects.ticketbot.stages.2.title"), description: t("projects.ticketbot.stages.2.description") },
      { title: t("projects.ticketbot.stages.3.title"), description: t("projects.ticketbot.stages.3.description") },
    ],
    skills: {
      technical: [
        t("projects.ticketbot.skills.technical.0"),
        t("projects.ticketbot.skills.technical.1"),
        t("projects.ticketbot.skills.technical.2"),
        t("projects.ticketbot.skills.technical.3"),
      ],
      transversal: [
        t("projects.ticketbot.skills.transversal.0"),
      ],
      human: [
        t("projects.ticketbot.skills.human.0"),
        t("projects.ticketbot.skills.human.1"),
      ],
    },
    academicValidation: [
      { name: t("projects.ticketbot.academicValidation.0"), validated: true },
      { name: t("projects.ticketbot.academicValidation.1"), validated: true },
      { name: t("projects.ticketbot.academicValidation.2"), validated: true },
    ],
    conclusion: t("projects.ticketbot.conclusion"),
    gallery: [
      '/images/projects/ticketbot.webp',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=Ticket+Panel',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=Transcript+Example',
      'https://placehold.co/600x400/1a1a1a/ffffff?text=Admin+Commands',
    ],
  },
  {
    id: "?",
    title: t("projects.last.title"),
    category: t("projects.category"),
    image: '/images/projects/last.webp',
    description: t("projects.last.description"),
    tools: [],
    context: t("projects.last.context"),
    gallery: [],
  },
];