import { Injectable } from '@nestjs/common';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';
import { DataSource } from 'typeorm';
import { Shortlink } from './entities/shortlink.entity';

@Injectable()
export class ShortlinksService {
  constructor(private dataSource: DataSource) {}
  create(createShortlinkDto: CreateShortlinkDto) {
    return 'This action adds a new shortlink';
  }

  findAll() {
    return this.dataSource.manager.findBy(Shortlink, {
      deleted_at: null,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} shortlink`;
  }

  update(id: number, updateShortlinkDto: UpdateShortlinkDto) {
    return `This action updates a #${id} shortlink`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortlink`;
  }
}
