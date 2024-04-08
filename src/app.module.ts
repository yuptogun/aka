import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShortlinksModule } from './shortlinks/shortlinks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (conf: ConfigService) => conf.get('typeORM'),
    }),
    ShortlinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
