import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
  ClassSerializerInterceptor,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ShortlinksService } from './shortlinks.service';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';
import { ConfigService } from '@nestjs/config';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('shortlinks')
export class ShortlinksController {
  constructor(
    private config: ConfigService,
    private readonly shortlinksService: ShortlinksService,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(
    @Body() body: CreateShortlinkDto,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const shortlink = await this.shortlinksService.create(body, ip);
    res.cookie('update_token', shortlink.update_token, { httpOnly: true });
    return shortlink;
  }

  @Get()
  findAll() {
    if (this.config.get('APP_DEBUG') === 'true') {
      return this.shortlinksService.findAll();
    }
    throw new HttpException('Forbidden.', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortlinksService.findOne(+id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() updateShortlinkDto: UpdateShortlinkDto,
    @Ip() ip: string,
  ) {
    if ('update_token' in req.cookies) {
      return this.findByIdAndTokenOrFail(+id, req.cookies['update_token'])
        .then(async (shortlink) => {
          await this.shortlinksService.update(
            shortlink.id,
            updateShortlinkDto,
            ip,
          );
        })
        .then(async () => {
          const shortlink = await this.shortlinksService.findOne(+id);
          res.cookie('update_token', shortlink.update_token);
          return shortlink;
        });
    }
    throw new HttpException('no token, no update.', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    if ('update_token' in req.cookies) {
      return this.findByIdAndTokenOrFail(+id, req.cookies['update_token'])
        .then(async (shortlink) => {
          await this.shortlinksService.remove(shortlink.id);
        })
        .then(() => {
          res.clearCookie('update_token');
          res.sendStatus(HttpStatus.NO_CONTENT);
          return;
        });
    }
    throw new HttpException('no token, no delete.', HttpStatus.BAD_REQUEST);
  }

  async findByIdAndTokenOrFail(id: number, token: string) {
    const shortlink = await this.shortlinksService.findOneByToken(id, token);
    if (!shortlink) {
      throw new HttpException('Not found - check token.', HttpStatus.NOT_FOUND);
    }
    return shortlink;
  }
}
