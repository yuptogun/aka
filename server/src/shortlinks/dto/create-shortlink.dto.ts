import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortlinkDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  title: null | string;
}
