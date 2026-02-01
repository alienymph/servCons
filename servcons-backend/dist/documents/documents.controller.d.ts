import { DocumentsService } from './documents.service';
import { S3Service } from '../storage/s3.service';
export declare class DocumentsController {
    private docs;
    private s3;
    constructor(docs: DocumentsService, s3: S3Service);
    create(dto: {
        title: string;
        caseId?: string;
        tags?: any;
    }): Promise<{
        id: string;
        uploadUrl: string;
    }>;
    list(q?: string): Promise<import("./document.entity").Document[]>;
    getOne(id: string): Promise<import("./document.entity").Document>;
    preview(id: string, v: string): Promise<{
        url: string;
    }>;
}
