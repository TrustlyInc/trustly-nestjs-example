import { ApiProperty } from '@nestjs/swagger';
import { DriverLicenseDto } from './driveLicense.dto';
import { AddressDto } from './address.dto';

export class CustomerDto {
  @ApiProperty()
  address: AddressDto;

  @ApiProperty()
  balance: any;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  currency: any;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  dateOfBirth: number;

  @ApiProperty()
  driverLicense: DriverLicenseDto;

  @ApiProperty()
  email: string;

  @ApiProperty()
  enrollDate: number;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  merchantId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  taxId: string;

  @ApiProperty()
  updatedAt: number;

  @ApiProperty()
  vip: string;
}
