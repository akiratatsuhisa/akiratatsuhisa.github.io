import { LocalePagesCommon } from './common';
import { LocalePagesDashboard } from './dashboard';
import { LocalePagesLegal } from './legal';
import { LocalePagesProject } from './project';
import { LocalePagesResume } from './resume';

export type LocalePages = {
  common: LocalePagesCommon;
  legal: LocalePagesLegal;
  resume: LocalePagesResume;
  project: LocalePagesProject;
  dashboard: LocalePagesDashboard;
};
