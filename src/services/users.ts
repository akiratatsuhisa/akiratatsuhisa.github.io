import { AxiosRequestConfig } from 'axios';

import { IUserResponse } from '@/interfaces';
import { Service } from '@/services/common';

export class UsersService extends Service {
  getByNickname(config: AxiosRequestConfig, nickname: string) {
    return this.fetch<IUserResponse>({
      ...config,
      url: `users/${nickname}`,
      method: 'GET',
    });
  }
}
