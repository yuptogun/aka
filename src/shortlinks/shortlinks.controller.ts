import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
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
// import { UpdateShortlinkDto } from './dto/update-shortlink.dto';
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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateShortlinkDto: UpdateShortlinkDto,
  // ) {
  //   return this.shortlinksService.update(+id, updateShortlinkDto);
  // }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    if ('update_token' in req.cookies) {
      const shortlink = await this.shortlinksService.findOneByToken(
        +id,
        req.cookies['update_token'],
      );
      if (!shortlink) {
        throw new HttpException(
          'Not found - check token.',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.shortlinksService.remove(shortlink.id);
      res.clearCookie('update_token');
      res.sendStatus(HttpStatus.NO_CONTENT);
      return;
    }
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }
}
