import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Shop.On Simple Backend')
    .setDescription('Simple backend to support Shop.On Demo App')
    .setVersion('1.0')
    .addTag('Shop.On')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080, '0.0.0.0');
}
bootstrap();
