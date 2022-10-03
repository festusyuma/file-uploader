import { S3 } from '@aws-sdk/client-s3';
import { ElasticTranscoder } from '@aws-sdk/client-elastic-transcoder';

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_ID ?? '',
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY ?? '',
};

export const s3 = new S3({
  region: process.env.S3_REGION,
  credentials,
});

export const transcoder = new ElasticTranscoder({
  region: process.env.S3_REGION,
  credentials,
});
