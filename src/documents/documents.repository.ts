import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { DocumentSchemaClass } from './entities/document.schema';

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectModel(DocumentSchemaClass.name)
    private readonly documentsModel: Model<DocumentSchemaClass>,
  ) {}

  async searchDocuments({
    search,
    indexed,
  }: {
    search: string;
    indexed: boolean;
  }): Promise<DocumentSchemaClass[]> {
    const where: FilterQuery<DocumentSchemaClass> = indexed
      ? { name_indexed: search }
      : { name: search };

    const documents = await this.documentsModel.find(where);
    return documents;
  }
}
