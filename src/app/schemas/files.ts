import Joi from 'joi';
import { FileUpload } from '@utils';

export const fileSchema = Joi.object<FileUpload>({});
