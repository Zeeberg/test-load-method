import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './documents.repository';
import { DocumentSchemaClass } from './entities/document.schema';

@Injectable()
export class DocumentsService {
  constructor(private readonly repository: DocumentRepository) {}

  async searchDocument({
    search,
    indexed,
  }: {
    search: string;
    indexed: boolean;
  }): Promise<DocumentSchemaClass[]> {
    const result = await this.repository.searchDocuments({ search, indexed });
    return result;
  }
}
