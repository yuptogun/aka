import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShortlinksService } from './shortlinks.service';
import { CreateShortlinkDto } from './dto/create-shortlink.dto';
import { UpdateShortlinkDto } from './dto/update-shortlink.dto';

@Controller('shortlinks')
export class ShortlinksController {
  constructor(private readonly shortlinksService: ShortlinksService) {}

  @Post()
  create(@Body() createShortlinkDto: CreateShortlinkDto) {
    return this.shortlinksService.create(createShortlinkDto);
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
