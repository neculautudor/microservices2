import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BookModule } from './book/book.module';
dotenv.config()
declare const module: any;
async function bootstrap() {
	const app = await NestFactory.create(BookModule, {
		cors: true,
		logger: ['error', 'warn', 'log']
	});
	const logger = new Logger('App')
	logger.log(`starting bis on port ${process.env.PORT}`)
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
