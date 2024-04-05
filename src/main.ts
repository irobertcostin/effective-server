import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://effective-media-agency.netlify.app/",
    allowedHeaders: 'Content-Type , application/json; charset=utf-8 , X-Requested-With , XMLHttpRequest',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  })
  await app.listen(3020);
}
bootstrap();
