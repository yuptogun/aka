import { PartialType } from '@nestjs/mapped-types';
import { CreateShortlinkDto } from './create-shortlink.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShortlinkDto extends PartialType(CreateShortlinkDto) {
  @IsNotEmpty()
  @IsString()
  title: string;
}
