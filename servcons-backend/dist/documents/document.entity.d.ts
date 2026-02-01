import { DocumentVersion } from './document-version.entity';
export declare class Document {
    id: string;
    title: string;
    caseId?: string;
    status: 'active' | 'archived';
    tags: Record<string, any>;
    createdAt: Date;
    versions: DocumentVersion[];
}
