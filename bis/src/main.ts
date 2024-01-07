import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
dotenv.config()
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule,  {
    cors: true,
    logger: ['error', 'warn', 'log']
  });
  const logger = new Logger('App')
  logger.log(`starting bis on port ${process.env.PORT}`)
  await app.listen(process.env.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
