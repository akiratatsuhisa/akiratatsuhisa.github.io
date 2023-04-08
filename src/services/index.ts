import axios, { CreateAxiosDefaults } from 'axios';

import { Service } from '@/services/common';
import { UsersService } from '@/services/users';

export { Service };

export const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const axiosInstacne = axios.create(config);

export const services = {
  users: new UsersService(),
};
