import { IPaginationRequest } from '@/interfaces/common';

export interface ISearchContactsRequest extends IPaginationRequest {}

export interface IContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isCancelled: boolean;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISendContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ISendContactResponse {}

export interface ICancelContactResponse {}
