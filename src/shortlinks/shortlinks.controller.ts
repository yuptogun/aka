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
} from '@nestjs/common';
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
  create(@Body() body: CreateShortlinkDto, @Ip() ip: string) {
    return this.shortlinksService.create(body, ip);
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
  remove(@Param('id') id: string) {
    return this.shortlinksService.remove(+id);
  }
}
