import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentVersion } from './document-version.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private docsRepo: Repository<Document>,
    @InjectRepository(DocumentVersion) private verRepo: Repository<DocumentVersion>,
  ) {}

  async createDocument(dto: { title: string; caseId?: string; tags?: any }) {
    const doc = this.docsRepo.create({
      title: dto.title,
      caseId: dto.caseId,
      tags: dto.tags ?? {},
      status: 'active',
    });
    return this.docsRepo.save(doc);
  }

  async createVersion(documentId: string, payload: { version: number; s3Key: string; sha256?: string; size?: number }) {
    const doc = await this.docsRepo.findOne({ where: { id: documentId } });
    if (!doc) throw new NotFoundException('Document not found');

    const v = this.verRepo.create({
      document: doc,
      version: payload.version,
      s3Key: payload.s3Key,
      sha256: payload.sha256 ?? '',
      size: payload.size ?? 0,
    });
    return this.verRepo.save(v);
  }

  async list(q?: string) {
    return this.docsRepo.find({ order: { createdAt: 'DESC' }, relations: ['versions'] });
  }

  async getOne(id: string) {
    const doc = await this.docsRepo.findOne({ where: { id }, relations: ['versions'] });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async getKey(id: string, version: number) {
    const ver = await this.verRepo.findOne({
      where: { document: { id }, version },
      relations: ['document'],
    });
    if (!ver) throw new NotFoundException('Version not found');
    return ver.s3Key;
  }
}
