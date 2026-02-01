import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { S3Service } from '../storage/s3.service';

@Controller('documents')
export class DocumentsController {
  constructor(private docs: DocumentsService, private s3: S3Service) {}

  @Post()
  async create(@Body() dto: { title: string; caseId?: string; tags?: any }) {
    const doc = await this.docs.createDocument(dto);
    const key = `docs/${doc.id}/${Date.now()}.pdf`;
    const uploadUrl = this.s3.getUploadUrl(key);
    await this.docs.createVersion(doc.id, { version: 1, s3Key: key });
    return { id: doc.id, uploadUrl };
  }

  @Get()
  async list(@Query('q') q?: string) {
    return this.docs.list(q);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.docs.getOne(id);
  }

  @Get(':id/versions/:v/preview')
  async preview(@Param('id') id: string, @Param('v') v: string) {
    const key = await this.docs.getKey(id, Number(v));
    return { url: this.s3.getDownloadUrl(key) };
  }
}
