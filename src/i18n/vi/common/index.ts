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
    en: 'Tiếng Anh',
    vi: 'Tiếng Việt',
    ja: 'Tiếng Nhật',
  },
  skillLevels: {
    beginner: 'Mới bắt đầu',
    average: 'Trung bình',
    skilled: 'Tay nghề cao',
    specialist: 'Chuyên gia',
    expert: 'Bậc thầy',
  },
  projectStatus: {
    initialize: 'Khởi tạo',
    onGoing: 'Đang diễn ra',
    maintain: 'Bảo trì',
    delay: 'Trì hoãn',
    cancel: 'Cancel',
    publish: 'Xuất bản',
  },
  isPublished: {
    false: 'Chưa được xuất bản',
    true: 'Đã xuất bản',
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
