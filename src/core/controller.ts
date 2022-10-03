import { DateTime } from 'luxon';
import { ControllerParams, response, ServiceParams } from '@utils';
import schema from '@schemas';

export const controller = async ({
  res,
  req,
  service,
  params = {},
  validation,
  filterValidation,
}: ControllerParams) => {
  let result;

  params = {
    ...params,
    data: { ...(params.data || {}), ...req.body },
    filters: {
      ...(params.filters || {}),
      ...(req.query as { [key: string]: string | undefined }),
    },
  };

  params.pagination = {
    page: Number(params.filters?.page ?? 0),
    size: Number(params.filters?.size ?? 10),
    totalItems: 0,
    totalPages: 0,
  };

  try {
    if (validation) {
      const { error, value: validatedData } = schema[validation.schema]
        .options(validation.options || {})
        .validate(params.data);

      if (error)
        result = response.badRequest(
          error.details.map((err) => err.message).join(', ')
        );
      else params = { ...params, validatedData };
    }

    if (filterValidation && !result) {
      const { error, value: filters } = schema[filterValidation].validate(
        params.filters
      );

      if (error)
        result = response.badRequest(
          error.details.map((err) => err.message).join(', ')
        );
      else params = { ...params, filters };
    }

    if (!result) result = await service(params as Required<ServiceParams>);
  } catch (e) {
    console.error('controller error');
    console.error(e);
    result = response.serverError();
  }

  const { status, success, message, data } = result;

  // todo add logger
  console.info(
    `response (${DateTime.now().toISO()}): ${JSON.stringify({
      status,
      success,
      message,
    })}`
  );

  return res.status(status).send({ success, message, data });
};
