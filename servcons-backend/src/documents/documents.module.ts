import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { DocumentVersion } from './document-version.entity';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { S3Service } from '../storage/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, DocumentVersion])],
  providers: [DocumentsService, S3Service],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
