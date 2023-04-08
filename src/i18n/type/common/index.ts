import { LocaleCommonFields } from './fields';
import { LocaleCommonLabels } from './labels';
import { LocaleCommonMessages } from './messages';
import { LocaleCommonPlurals } from './plurals';
import { LocaleCommonTitles } from './titles';
import { LocaleCommonValidations } from './validations';

export type LocaleCommon = {
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    gmail: string;
  };
  languages: {
    en: string;
    vi: string;
    ja: string;
  };
  skillLevels: {
    beginner: string;
    average: string;
    skilled: string;
    specialist: string;
    expert: string;
  };
  projectStatus: {
    initialize: string;
    onGoing: string;
    maintain: string;
    delay: string;
    cancel: string;
    publish: string;
  };
  isPublished: { false: string; true: string };
  programingLanguages: {
    csharp: string;
    css: string;
    dart: string;
    go: string;
    html: string;
    javascript: string;
    python: string;
    sass: string;
    typescript: string;
  };
  frameworks: {
    angular: string;
    bootstrap: string;
    django: string;
    dotnetcore: string;
    express: string;
    flutter: string;
    next: string;
    nest: string;
    nodejs: string;
    nuxt: string;
    react: string;
    tailwindcss: string;
    vue: string;
  };
  databases: {
    elasticsearch: string;
    mongodb: string;
    mysql: string;
    neo4j: string;
    postgresql: string;
    redis: string;
    sqlite: string;
  };
  technologies: {
    aws: string;
    azure: string;
    docker: string;
    eslint: string;
    figma: string;
    github: string;
    graphql: string;
    nginx: string;
    socketio: string;
  };

  titles: LocaleCommonTitles;
  messages: LocaleCommonMessages;
  labels: LocaleCommonLabels;
  fields: LocaleCommonFields;
  validations: LocaleCommonValidations;
  plurals: LocaleCommonPlurals;
};
