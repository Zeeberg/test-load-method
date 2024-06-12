import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentSchema,
  DocumentSchemaClass,
} from 'src/documents/entities/document.schema';
import { DocumentSeedService } from './document-seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentSchemaClass.name,
        schema: DocumentSchema,
      },
    ]),
  ],
  providers: [DocumentSeedService],
  exports: [DocumentSeedService],
})
export class DocumentSeedModule {}
