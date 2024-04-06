import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ShortlinksModule } from './shortlinks/shortlinks.module';

@Module({
  imports: [ConfigModule.forRoot(), ShortlinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
