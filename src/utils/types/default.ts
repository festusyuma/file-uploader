import { ValidationOptions } from 'joi';
import { Request, Response } from 'express';

export interface ValidationRequest {
  schema: string;
  options?: ValidationOptions;
}

export interface ControllerParams {
  res: Response;
  req: Request;
  service: Service;
  params?: ServiceParams;
  validation?: ValidationRequest;
  filterValidation?: string;
}

export type Service<T = unknown, R = unknown, F = unknown> = (
  params: Required<ServiceParams<T, F>>
) => Promise<ServiceResponse<R>>;

export interface ServiceParams<
  T = unknown,
  F = { [key: string]: string | undefined | null }
> {
  id?: number;
  data?: T;
  validatedData?: T;
  pagination?: Pagination;
  filters?: F;
  reference?: string;
  query?: string;
  scope?: string;
  file?: Express.Multer.File;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages?: number;
  totalItems?: number;
}

export interface ServiceResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data?: T | null;
}
