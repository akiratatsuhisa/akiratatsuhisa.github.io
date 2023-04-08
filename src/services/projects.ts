import { AxiosRequestConfig } from 'axios';

import {
  ICreateProjectLocalizationRequest,
  ICreateProjectRequest,
  ICreateProjectResponse,
  IDeleteProjectResponse,
  IProjectDetailResponse,
  IProjectResponse,
  ISearchProjectsRequest,
  IUpdateProjectLocalizationRequest,
  IUpdateProjectRequest,
  IUpdateProjectResponse,
} from '@/interfaces';
import { Service } from '@/services/common';

export class ProjectsService extends Service {
  search(config: AxiosRequestConfig, params: ISearchProjectsRequest) {
    return this.fetch<Array<IProjectResponse>>({
      ...config,
      params,
      url: `projects`,
      method: 'GET',
    });
  }

  searchById(config: AxiosRequestConfig, id: string) {
    return this.fetch<IProjectDetailResponse>({
      ...config,
      url: `projects/${id}`,
      method: 'GET',
    });
  }

  create(config: AxiosRequestConfig, data: ICreateProjectRequest) {
    return this.fetch<ICreateProjectResponse>({
      ...config,
      data,
      url: `projects`,
      method: 'POST',
    });
  }

  update(config: AxiosRequestConfig, id: string, data: IUpdateProjectRequest) {
    return this.fetch<IUpdateProjectResponse>({
      ...config,
      data,
      url: `projects/${id}`,
      method: 'PUT',
    });
  }

  delete(config: AxiosRequestConfig, id: string) {
    return this.fetch<IDeleteProjectResponse>({
      ...config,
      url: `projects/${id}`,
      method: 'DELETE',
    });
  }

  upsertLocale(
    config: AxiosRequestConfig,
    projectId: string,
    languageCode: string,
    data: ICreateProjectLocalizationRequest | IUpdateProjectLocalizationRequest,
  ) {
    return this.fetch<IUpdateProjectResponse>({
      ...config,
      data,
      url: `projects/${projectId}/locale/${languageCode}`,
      method: 'PUT',
    });
  }

  deleteLocale(
    config: AxiosRequestConfig,
    projectId: string,
    languageCode: string,
  ) {
    return this.fetch<IUpdateProjectResponse>({
      ...config,
      url: `projects/${projectId}/locale/${languageCode}`,
      method: 'DELETE',
    });
  }

  uploadImage(
    config: AxiosRequestConfig,
    id: string,
    data: { isThumb?: boolean },
  ) {
    return this.fetch<{ link: string }>({
      ...config,
      data,
      url: `projects/${id}/image`,
      method: 'POST',
    });
  }

  deleteImage(
    config: AxiosRequestConfig,
    id: string,
    data: { index?: number },
  ) {
    return this.fetch<void>({
      ...config,
      data,
      url: `projects/${id}/image`,
      method: 'DELETE',
    });
  }

  sortImage(
    config: AxiosRequestConfig,
    id: string,
    data: { index: number; mode: 'increment' | 'decrement' },
  ) {
    return this.fetch<void>({
      ...config,
      data,
      url: `projects/${id}/image`,
      method: 'PATCH',
    });
  }

  uploadDropbox(config: AxiosRequestConfig, uploadLink: string, data: File) {
    return this.fetch<void>({
      ...config,
      headers: { 'Content-Type': 'application/octet-stream' },
      baseURL: uploadLink,
      method: 'POST',
      data,
    });
  }

  // Guest
  searchPublish(config: AxiosRequestConfig, languageCode: string) {
    return this.fetch<Array<IProjectResponse>>({
      ...config,
      url: `projects/publish/locale/${languageCode}`,
      method: 'GET',
    });
  }

  searchBySlug(config: AxiosRequestConfig, slug: string, languageCode: string) {
    return this.fetch<IProjectDetailResponse>({
      ...config,
      url: `projects/slug/${slug}/locale/${languageCode}`,
      method: 'GET',
    });
  }
}
