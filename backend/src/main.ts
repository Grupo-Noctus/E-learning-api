import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173', // Permite apenas o frontend nesta origem
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
