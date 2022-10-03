import Joi from 'joi';
import * as fileSchemas from './files';
export * from './files';

const schemas: { [key: string]: Joi.ObjectSchema } = { ...fileSchemas };

export default schemas;
