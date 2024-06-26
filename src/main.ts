import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3020
  // const port = 3020

  app.useGlobalPipes(new ValidationPipe());


  app.enableCors({
    origin: ["https://effective-media-agency.netlify.app/", "https://effective-media-agency.netlify.app", "http://localhost:3000", "http://localhost:3001", "http://localhost:3001", "https://effective-media-blog.netlify.app", "https://effective-media-blog.netlify.app/", "https://effectivemedia.ro", "https://www.effectivemedia.ro", "https://blog.effectivemedia.ro", "https://effective-admin.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Origin', 'XMLHttpRequest', 'X-Requested-With', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true
  })

  await app.listen(port);
}
bootstrap();
