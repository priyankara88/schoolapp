import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:5173', // allow your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // allow all HTTP methods
    credentials: true, // if you are using cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
