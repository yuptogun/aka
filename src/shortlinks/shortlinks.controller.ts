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
} from '@nestjs/common';
import { ShortlinksService } from './shortlinks.service';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('shortlinks')
export class ShortlinksController {
  constructor(private readonly shortlinksService: ShortlinksService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  create(@Body() body: CreateShortlinkDto, @Ip() ip: string) {
    return this.shortlinksService.create(body, ip);
  }

  @Get()
  findAll() {
    return this.shortlinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortlinksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortlinkDto: UpdateShortlinkDto,
  ) {
    return this.shortlinksService.update(+id, updateShortlinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortlinksService.remove(+id);
  }
}
