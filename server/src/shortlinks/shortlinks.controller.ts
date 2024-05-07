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
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ShortlinksService } from './shortlinks.service';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';
import { ConfigService } from '@nestjs/config';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class ShortlinksController {
  constructor(
    private config: ConfigService,
    private readonly service: ShortlinksService,
  ) {}

  @Get(':code')
  @HttpCode(HttpStatus.FOUND)
  async redirectByCode(@Param('code') code: string) {
    const shortlink = await this.service.findOneByCode(code);
    if (!shortlink) {
      throw new HttpException('shortlink not found!', HttpStatus.NOT_FOUND);
    }
    const url = shortlink.url;
    return 'now bringing you to <a href="___" noreferer noopener>___</a>...<script>setTimeout(function () { window.location.href = "___"; }, 1000);</script>'.replaceAll(
      '___',
      url,
    );
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('api/shortlinks')
  async create(
    @Body() body: CreateShortlinkDto,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const shortlink = await this.service.create(body, ip);
    res.cookie('update_token', shortlink.update_token, { httpOnly: true });
    return shortlink;
  }

  @Get('api/shortlinks')
  findAll() {
    if (this.config.get('APP_DEBUG') === 'true') {
      return this.service.findAll();
    }
    throw new HttpException('Forbidden.', HttpStatus.FORBIDDEN);
  }

  @Get('api/shortlinks/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch('api/shortlinks/:id')
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
          await this.service.update(shortlink.id, updateShortlinkDto, ip);
        })
        .then(async () => {
          const shortlink = await this.service.findOne(+id);
          res.cookie('update_token', shortlink.update_token);
          return shortlink;
        });
    }
    throw new HttpException('no token, no update.', HttpStatus.BAD_REQUEST);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('api/shortlinks/:id')
  async remove(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    if ('update_token' in req.cookies) {
      return this.findByIdAndTokenOrFail(+id, req.cookies['update_token'])
        .then(async (shortlink) => {
          await this.service.remove(shortlink.id);
        })
        .then(() => {
          res.clearCookie('update_token');
          return;
        });
    }
    throw new HttpException('no token, no delete.', HttpStatus.BAD_REQUEST);
  }

  async findByIdAndTokenOrFail(id: number, token: string) {
    const shortlink = await this.service.findOneByToken(id, token);
    if (!shortlink) {
      throw new HttpException('Not found - check token.', HttpStatus.NOT_FOUND);
    }
    return shortlink;
  }
}