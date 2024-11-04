import { LocaleCommon } from '@/i18n/type/common';

import { fields } from './fields';
import { labels } from './labels';
import { messages } from './messages';
import { plurals } from './plurals';
import { titles } from './titles';
import { validations } from './validations';

export const common: LocaleCommon = {
  socials: {
    github: 'ギットハブ',
    twitter: 'ツイッター',
    linkedin: 'リンクトイン',
    gmail: 'Gメール',
  },
  languages: {
    en: '英語',
    vi: 'ベトナム語',
    ja: '日本語',
  },
  skillLevels: {
    beginner: '初心者',
    average: '平均',
    skilled: '熟練した',
    specialist: '専門家',
    expert: 'エキスパート',
  },
  projectStatus: {
    initialize: '初期化',
    onGoing: '進行中',
    maintain: '維持',
    delay: '遅延',
    cancel: '取消',
    publish: '公開',
  },
  isPublished: {
    false: '不公開',
    true: '公開中',
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
