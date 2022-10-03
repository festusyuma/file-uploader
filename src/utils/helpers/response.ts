import { ServiceResponse, successfulMsg } from '@utils';

const build = <T>({
  status,
  success = false,
  message = 'failed',
  data = null,
}: Partial<ServiceResponse<T>>): ServiceResponse<T> => {
  return { status: status ? status : 500, success, message, data };
};

export const success = <T>(
  data: T | null = null,
  message: string = successfulMsg
) => {
  return build<T>({
    status: 200,
    success: true,
    message,
    data,
  });
};

export const failed = (message: string, data = null) => {
  return build({
    status: 200,
    message,
    data,
  });
};

export const badRequest = (message: string) => {
  return build({
    status: 400,
    message,
  });
};

export const unauthorized = (message = 'Unauthorized') => {
  return build({
    status: 401,
    message,
  });
};

export const forbidden = (message = 'You do not have permission') => {
  return build({
    status: 403,
    message,
  });
};

export const serverError = (message = 'An internal server error occurred') => {
  return build({
    status: 500,
    message,
  });
};
