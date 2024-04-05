import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://effective-media-agency.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true
  })

  await app.listen(3020);
}
bootstrap();
