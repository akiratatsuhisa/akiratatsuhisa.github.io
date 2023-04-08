import { AxiosRequestConfig } from 'axios';

import {
  ICancelContactResponse,
  IContactResponse,
  ISearchContactsRequest,
  ISendContactRequest,
  ISendContactResponse,
} from '@/interfaces';
import { Service } from '@/services/common';

export class ResumeService extends Service {
  downloadCV(config: AxiosRequestConfig) {
    return this.fetch<Blob>({
      ...config,
      baseURL: '',
      url: `/cv.pdf`,
      method: 'GET',
      responseType: 'blob',
    });
  }

  searchContact(config: AxiosRequestConfig, params: ISearchContactsRequest) {
    return this.fetch<Array<IContactResponse>>({
      ...config,
      url: `resume/contact`,
      method: 'GET',
      params,
    });
  }

  sendContact(config: AxiosRequestConfig, data: ISendContactRequest) {
    return this.fetch<ISendContactResponse>({
      ...config,
      url: `resume/contact`,
      method: 'POST',
      data,
    });
  }

  cancelContact(config: AxiosRequestConfig, id: string) {
    return this.fetch<ICancelContactResponse>({
      ...config,
      url: `resume/contact/${id}`,
      method: 'DELETE',
    });
  }
}
