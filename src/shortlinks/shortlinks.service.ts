import { Injectable } from '@nestjs/common';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';
import { Repository } from 'typeorm';
import { Shortlink } from './entities/shortlink.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShortlinksService {
  constructor(
    @InjectRepository(Shortlink)
    private repo: Repository<Shortlink>,
  ) {}

  create(input: CreateShortlinkDto) {
    return input;
  }

  findAll() {
    return this.repo.findBy({
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
