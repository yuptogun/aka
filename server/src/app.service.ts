import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'; // `Hello World from ${process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT}!`;
  }
}
