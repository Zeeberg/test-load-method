import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentSchemaClass } from 'src/documents/entities/document.schema';
import { faker } from '@faker-js/faker';
import { chunk } from 'lodash';

@Injectable()
export class DocumentSeedService {
  constructor(
    @InjectModel(DocumentSchemaClass.name)
    private readonly model: Model<DocumentSchemaClass>,
  ) {}

  async run() {
    const logger = new Logger();
    logger.debug('Inserting docs...');

    const total = await this.model.countDocuments();

    const started = Date.now();

    const DOCUMENTS_TO_SAVE = 1_000_000;
    const CHUNK = 200_000;
    const PARALLEL_EXECUTION_CHUNK = 20_000;

    let inserted = 0;

    let documentsToInsert = [];

    if (total < DOCUMENTS_TO_SAVE) {
      for (let i = 0; i < DOCUMENTS_TO_SAVE; i++) {
        const randomWord = faker.word.sample();

        documentsToInsert.push(
          new this.model({ name: randomWord, name_indexed: randomWord }),
        );

        if (documentsToInsert.length % CHUNK === 0) {
          const chunks = chunk<Model<DocumentSchemaClass>>(
            documentsToInsert,
            PARALLEL_EXECUTION_CHUNK,
          );

          await Promise.all(
            chunks.map((chunk) =>
              this.model.insertMany(chunk, {
                ordered: false,
              }),
            ),
          );

          inserted += CHUNK;

          logger.debug(
            `Inserting documents - ${((inserted / DOCUMENTS_TO_SAVE) * 100).toFixed()}%, Total: ${inserted}`,
          );

          documentsToInsert = [];
        }
      }
    }

    const totalResult = await this.model.countDocuments();

    logger.debug(
      `Total documents: ${totalResult}, Operation took - ${((Date.now() - started) * 0.001).toFixed()} seconds`,
    );
  }
}
