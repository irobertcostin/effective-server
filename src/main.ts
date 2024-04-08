import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const port = process.env.PORT || 3020
  const port = 3020
  app.enableCors({
    origin: ["https://effective-media-agency.netlify.app/", "https://effective-media-agency.netlify.app", "http://localhost:3000", "https://effective-media-blog.netlify.app", "https://effective-media-blog.netlify.app/", "https://effectivemedia.ro", "https://www.effectivemedia.ro"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Origin', 'XMLHttpRequest', 'X-Requested-With', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true
  })

  await app.listen(port);
}
bootstrap();
