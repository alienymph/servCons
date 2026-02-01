import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { Document } from './document.entity';

@Entity('document_versions')
export class DocumentVersion {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Document, (d) => d.versions, { onDelete: 'CASCADE' }) document: Document;
  @Column() version: number;
  @Column() s3Key: string;
  @Column({ default: '' }) sha256: string;
  @Column('int', { default: 0 }) size: number;
  @Column({ type: 'text', nullable: true }) ocrText?: string;
  @Index() @CreateDateColumn() createdAt: Date;
}
