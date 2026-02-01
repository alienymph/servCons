import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentVersion } from './document-version.entity';
export declare class DocumentsService {
    private docsRepo;
    private verRepo;
    constructor(docsRepo: Repository<Document>, verRepo: Repository<DocumentVersion>);
    createDocument(dto: {
        title: string;
        caseId?: string;
        tags?: any;
    }): Promise<Document>;
    createVersion(documentId: string, payload: {
        version: number;
        s3Key: string;
        sha256?: string;
        size?: number;
    }): Promise<DocumentVersion>;
    list(q?: string): Promise<Document[]>;
    getOne(id: string): Promise<Document>;
    getKey(id: string, version: number): Promise<string>;
}
