import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShortlinksModule } from './shortlinks/shortlinks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormconfig from '../database/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormconfig],
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
