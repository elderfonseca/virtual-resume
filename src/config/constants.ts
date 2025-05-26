import { NavigationItem, SkillsData, Project, SocialLink, ContactInfo, Language } from '@/types';

/**
 * Application-wide constants
 */

// Navigation items for header and mobile menu
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', translationKey: 'nav.home' },
  { id: 'about', translationKey: 'nav.about' },
  { id: 'experience', translationKey: 'nav.experience' },
  { id: 'skills', translationKey: 'nav.skills' },
  { id: 'projects', translationKey: 'nav.projects' },
  { id: 'contact', translationKey: 'nav.contact' },
];

// Skills data for the skills section
export const SKILLS_DATA: SkillsData = {
  frontend: [
    { name: 'Angular', level: 95 },
    { name: 'TypeScript', level: 92 },
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'SCSS', level: 85 },
    { name: 'React', level: 75 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'REST API', level: 90 },
    { name: 'GraphQL', level: 70 },
    { name: 'MongoDB', level: 75 },
    { name: 'WebSocket', level: 80 },
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'Jenkins', level: 80 },
    { name: 'Azure', level: 75 },
    { name: 'AWS', level: 70 },
    { name: 'CI/CD', level: 85 },
  ],
  other: [
    { name: 'Scrum', level: 80 },
    { name: 'Microservices', level: 85 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Testing', level: 80 },
    { name: 'Performance Opt', level: 85 },
  ],
};

// Projects data for the projects section
export const PROJECTS_DATA: Project[] = [
  {
    id: 'intranet',
    translationKey: 'projects.intranet',
    image: '/images/projects/intranet-project.jpg',
  },
  {
    id: 'gamification',
    translationKey: 'projects.gamification',
    image: '/images/projects/gamification-project.jpg',
  },
  {
    id: 'virtualMuseum',
    translationKey: 'projects.virtualMuseum',
    image: '/images/projects/virtual-museum.jpg',
  },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/elder-fonseca-lima',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/elderfonseca',
    icon: 'github',
  },
];

// Contact information
export const CONTACT_INFO: ContactInfo = {
  email: 'elder.fonseca15@gmail.com',
  phone: '+55 (61) 98429-9449',
  location: 'Brasília - DF, Brazil',
};

// Available languages for the language switcher
export const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
];

export default {
  NAVIGATION_ITEMS,
  SKILLS_DATA,
  PROJECTS_DATA,
  SOCIAL_LINKS,
  CONTACT_INFO,
  AVAILABLE_LANGUAGES,
};
