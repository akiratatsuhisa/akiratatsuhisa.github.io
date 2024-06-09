export interface ISearchProjectsRequest {
  title?: string;
  client?: string;
  status?: Array<string>;
  language?: Array<string>;
}

export interface IProjectLocalizationResponse {
  id: string;
  slug: string;
  languageCode: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectResponse {
  id: string;
  thumbSrc: string | null;
  sort: number;
  isPublished: boolean;
  startDate: string | null;
  endDate: string | null;
  status: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  projectLocalizations: Array<IProjectLocalizationResponse>;
  projectLocalization: IProjectLocalizationResponse;
}

export interface IProjectLocalizationDetailResponse {
  id: string;
  slug: string;
  languageCode: string;
  title: string;
  description: string | null;
  client: string | null;
  website: string | null;
  source: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectDetailResponse {
  id: string;
  thumbSrc: string | null;
  sort: number;
  isPublished: boolean;
  startDate: string | null;
  endDate: string | null;
  status: string;
  imageSrcs: Array<string>;
  languages: Array<string>;
  frameworks: Array<string>;
  databases: Array<string>;
  technologies: Array<string>;
  others: Array<string>;
  views: number;
  createdAt: string;
  updatedAt: string;
  projectLocalizations: Array<IProjectLocalizationDetailResponse>;
  projectLocalization: IProjectLocalizationDetailResponse;
}

export interface IUpsertProjectRequest {
  isPublished: boolean;
  startDate: string;
  endDate: string;
  status: string;
  languages: Array<string>;
  frameworks: Array<string>;
  databases: Array<string>;
  technologies: Array<string>;
  others: Array<string>;
}

export interface ICreateProjectRequest extends IUpsertProjectRequest {}

export interface IUpdateProjectRequest extends IUpsertProjectRequest {}

export interface IUpsertProjectResponse {
  id: string;
}

export interface ICreateProjectResponse extends IUpsertProjectResponse {}

export interface IUpdateProjectResponse extends IUpsertProjectResponse {}

export interface IDeleteProjectResponse {
  id: string;
}

export interface IUpsertProjectLocalizationRequest {
  title: string;
  slug: string;
}

export interface ICreateProjectLocalizationRequest
  extends IUpsertProjectLocalizationRequest {}

export interface IUpdateProjectLocalizationRequest
  extends IUpsertProjectLocalizationRequest {
  description: string;
  client: string;
  website: string;
  source: string;
}
