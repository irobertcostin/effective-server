import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  // app.enableCors({
  //   "origin": "https://effective-media-agency.netlify.app/",
  //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   "preflightContinue": false,
  //   "optionsSuccessStatus": 204
  // })

  await app.listen(3020);
}
bootstrap();
