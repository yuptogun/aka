import { Injectable } from '@nestjs/common';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';

@Injectable()
export class ShortlinksService {
  create(createShortlinkDto: CreateShortlinkDto) {
    return 'This action adds a new shortlink';
  }

  findAll() {
    return `This action returns all shortlinks`;
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
