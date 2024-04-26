import { Injectable } from '@nestjs/common';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';
import { Repository } from 'typeorm';
import { Shortlink } from './entities/shortlink.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandomValues, randomBytes } from 'crypto';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable()
export class ShortlinksService {
  constructor(
    @InjectRepository(Shortlink)
    private repo: Repository<Shortlink>,
  ) {}

  async create(body: CreateShortlinkDto, ip: string) {
    let shortlink = await this.repo.findOneBy({
      url: body.url,
    });
    if (shortlink === null) {
      const newShortlink = new Shortlink();
      newShortlink.url = body.url;
      newShortlink.title = body.title;
      newShortlink.code = await this.getRandomCode();
      newShortlink.update_token = randomBytes(20).toString('hex');
      newShortlink.saved_from = ip;
      shortlink = await this.repo.save(newShortlink);
    }
    return shortlink;
  }

  findAll() {
    return this.repo.find({
      order: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id: id });
  }

  async findOneByToken(id: number, token: string) {
    return await this.repo.findOneBy({
      id: id,
      update_token: token,
    });
  }

  async findOneByCode(code: string) {
    return await this.repo.findOneBy({
      code: code,
    });
  }

  async update(id: number, updateShortlinkDto: UpdateShortlinkDto, ip: string) {
    await this.repo.update(id, {
      title: updateShortlinkDto.title,
      update_token: randomBytes(20).toString('hex'),
      saved_from: ip,
    });
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }

  async getRandomCode(len: number = 3): Promise<string> {
    const maxTrial = chars.length ** len;
    let trial = 0;
    let code: string;
    let shouldRetry = true;
    do {
      if (trial === maxTrial) {
        code = await this.getRandomCode(++len);
        shouldRetry = false;
      } else {
        trial++;
        code = this.createRandomCode(len);
        shouldRetry = await this.repo.existsBy({
          code: code,
        });
      }
    } while (shouldRetry);

    return code;
  }

  createRandomCode(length: number) {
    let result = '';
    const randomArray = new Uint8Array(length);
    getRandomValues(randomArray);
    randomArray.forEach((number) => {
      result += chars[number % chars.length];
    });
    return result;
  }
}
