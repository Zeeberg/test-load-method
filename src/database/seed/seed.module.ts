import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSeedModule } from './document/document-seed.module';
import databaseConfig from '../config/database-config';
import appConfig from 'src/config/app.config';
import { MongooseConfigService } from '../mongoose-config.service';

@Module({
  imports: [
    DocumentSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class SeedModule {}
