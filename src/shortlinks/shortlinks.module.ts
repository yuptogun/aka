import { Module } from '@nestjs/common';
import { ShortlinksService } from './shortlinks.service';
import { ShortlinksController } from './shortlinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortlink } from './entities/shortlink.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shortlink])],
  controllers: [ShortlinksController],
  providers: [ShortlinksService],
})
export class ShortlinksModule {}
