import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  address1: string;

  @ApiProperty()
  address2?: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  zip: string;
}
