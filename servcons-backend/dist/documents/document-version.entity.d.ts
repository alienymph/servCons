import { Document } from './document.entity';
export declare class DocumentVersion {
    id: string;
    document: Document;
    version: number;
    s3Key: string;
    sha256: string;
    size: number;
    ocrText?: string;
    createdAt: Date;
}
