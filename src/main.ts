import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const configService = app.get(ConfigService<AllConfigType>);

  const port = configService.get('app.port', { infer: true });

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  logger.log(`Application running - http://localhost:${port}/`);
}
bootstrap();
