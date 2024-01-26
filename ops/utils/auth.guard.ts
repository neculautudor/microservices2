import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv"
dotenv.config()
@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	) {
		const request = context.switchToHttp().getRequest();

		const token = request.headers.authorization?.split(" ")[1];
		if (!token) {
			return false;
		}

		try {
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

			request.user = decoded;
			return true;
		} catch (error) {
			return false;
		}
	}
}
