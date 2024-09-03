import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api', {
    exclude: [{ path: '*', method: RequestMethod.ALL }]
  })
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
