import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import S3 from 'aws-sdk/clients/s3';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucket: string;

  constructor(private cfg: ConfigService) {
    const endpoint = this.cfg.get<string>('S3_ENDPOINT');
    const region   = this.cfg.get<string>('S3_REGION') ?? 'us-east-1';
    const access   = this.cfg.get<string>('S3_ACCESS_KEY');
    const secret   = this.cfg.get<string>('S3_SECRET_KEY');
    const bucket   = this.cfg.get<string>('S3_BUCKET');

    if (!endpoint || !access || !secret || !bucket) {
      throw new Error('Faltan variables S3_*. Revisa tu .env (S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET).');
    }

    this.bucket = bucket;

    this.s3 = new S3({
      endpoint,
      region,
      accessKeyId: access,
      secretAccessKey: secret,
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  getUploadUrl(key: string) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: key,
      ContentType: 'application/pdf',
      Expires: 300,
    });
  }

  getDownloadUrl(key: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: 300,
    });
  }
}
