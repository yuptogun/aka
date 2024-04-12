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
      deleted_at: null,
      url: body.url,
    });
    if (shortlink === null) {
      const newShortlink = new Shortlink();
      newShortlink.url = body.url;
      newShortlink.code = await this.getRandomCode();
      newShortlink.update_token = randomBytes(20).toString('hex');
      newShortlink.saved_from = ip;
      shortlink = await this.repo.save(newShortlink);
    }
    return shortlink;
  }

  findAll() {
    return this.repo.find({
      where: {
        deleted_at: null,
      },
      order: {
        id: 'desc',
      },
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
          deleted_at: null,
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
