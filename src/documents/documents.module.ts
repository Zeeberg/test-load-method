import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentRepository } from './documents.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentSchema,
  DocumentSchemaClass,
} from './entities/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentSchemaClass.name,
        schema: DocumentSchema,
      },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentRepository],
  exports: [DocumentsService],
})
export class DocumentsModule {}
