import { LocaleCommon } from '@/i18n/type/common';

import { fields } from './fields';
import { labels } from './labels';
import { messages } from './messages';
import { plurals } from './plurals';
import { titles } from './titles';
import { validations } from './validations';

export const common: LocaleCommon = {
  socials: {
    github: 'Github',
    twitter: 'Twitter',
    linkedin: 'Linkedin',
    gmail: 'Gmail',
  },
  languages: {
    en: 'English',
    vi: 'Vietnamese',
    ja: 'Japanese',
  },
  skillLevels: {
    beginner: 'Beginner',
    average: 'Average',
    skilled: 'Skilled',
    specialist: 'Specialist',
    expert: 'Expert',
  },
  projectStatus: {
    initialize: 'Initialize',
    onGoing: 'On going',
    maintain: 'Maintain',
    delay: 'Delay',
    cancel: 'Cancel',
    publish: 'Publish',
  },
  isPublished: {
    false: 'Not published yet',
    true: 'Is published',
  },
  programingLanguages: {
    csharp: 'C#',
    css: 'CSS',
    dart: 'Dart',
    go: 'Go',
    html: 'HTML',
    javascript: 'Javascript',
    python: 'Python',
    sass: 'Sass',
    typescript: 'Typescript',
  },
  frameworks: {
    angular: 'Angular',
    bootstrap: 'Bootstrap',
    django: 'Django',
    dotnetcore: '.Net Core',
    express: 'Express.js',
    flutter: 'Flutter',
    next: 'Next.js',
    nest: 'Nest.js',
    nodejs: 'Node.js',
    nuxt: 'Nuxt.js',
    react: 'React',
    tailwindcss: 'Tailwindcss',
    vue: 'Vue',
  },
  databases: {
    elasticsearch: 'Elasticsearch',
    mongodb: 'MongoDB',
    mysql: 'MySQL',
    neo4j: 'Neo4j',
    postgresql: 'PostgreSQL',
    redis: 'Redis',
    sqlite: 'SQLite',
  },
  technologies: {
    aws: 'Amazon Web Services',
    azure: 'Azure',
    docker: 'Docker',
    eslint: 'ESLint',
    figma: 'Figma',
    github: 'Github',
    graphql: 'Graphql',
    nginx: 'Nginx',
    socketio: 'Socket IO',
  },
  titles,
  messages,
  labels,
  fields,
  validations,
  plurals,
};
