import { PartialType } from '@nestjs/mapped-types';
import { CreateShortlinkDto } from './create-shortlink.dto';

export class UpdateShortlinkDto extends PartialType(CreateShortlinkDto) {}
