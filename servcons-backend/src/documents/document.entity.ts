import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { DocumentVersion } from './document-version.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() title: string;
  @Column({ nullable: true }) caseId?: string;
  @Column({ default: 'active' }) status: 'active' | 'archived';
  @Column({ type: 'jsonb', default: {} }) tags: Record<string, any>;
  @CreateDateColumn() createdAt: Date;
  @OneToMany(() => DocumentVersion, (v) => v.document, { cascade: true })
  versions: DocumentVersion[];
}
