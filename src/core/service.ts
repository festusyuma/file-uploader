import { response, ServiceResponse } from '@utils';

export const service = async <T = unknown>(
  func: () => Promise<ServiceResponse<T>>
): Promise<ServiceResponse<T | unknown>> => {
  try {
    return await func();
  } catch (e: unknown) {
    console.error('service error');
    console.error(e);
    return response.serverError();
  }
};
