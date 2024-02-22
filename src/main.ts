import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const start = async() => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log(`SERVER RUNING IN PORT: "${port}"`);
  });
}
start();