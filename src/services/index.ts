import axios, { CreateAxiosDefaults } from 'axios';

import { Service } from '@/services/common';
import { ProjectsService } from '@/services/projects';
import { ResumeService } from '@/services/resume';
import { UsersService } from '@/services/users';

export { Service };

export const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const axiosInstacne = axios.create(config);

export const services = {
  resume: new ResumeService(),
  users: new UsersService(),
  projects: new ProjectsService(),
};
