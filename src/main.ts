import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const configService = app.get(ConfigService<AllConfigType>);

  const port = configService.get('app.port', { infer: true });

  await app.listen(port);
  logger.log(`Application running - http://localhost:${port}/`);
}
bootstrap();
