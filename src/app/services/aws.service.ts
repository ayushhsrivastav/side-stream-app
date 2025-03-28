import AWS from 'aws-sdk';
import config from '../../config/config';
import { readFile, unlink } from 'fs/promises';
import { reportError } from '../errors/report-error.error';
import { BaseError } from '../utils/error.util';

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

export async function uploadFile(
  filePath: string,
  fileName: string
): Promise<string> {
  try {
    const fileStream = await readFile(filePath);

    const params = {
      Bucket: config.aws.bucketName,
      Key: `music/${fileName}_${Date.now()}`,
      Body: fileStream,
      ContentType: 'audio/mpeg',
    };

    const result = await s3.upload(params).promise();

    await unlink(filePath);

    return result.Location;
  } catch (error) {
    reportError(error as BaseError);
    throw error;
  }
}
