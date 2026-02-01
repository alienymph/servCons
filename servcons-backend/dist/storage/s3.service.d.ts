import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private cfg;
    private s3;
    private bucket;
    constructor(cfg: ConfigService);
    getUploadUrl(key: string): string;
    getDownloadUrl(key: string): string;
}
