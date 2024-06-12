import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { DocumentSeedService } from './document/document-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(DocumentSeedService).run();

  await app.close();
};

runSeed();
