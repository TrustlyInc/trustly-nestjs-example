import { ApiProperty } from '@nestjs/swagger';
import { DriverLicenseDto } from './driveLicense.dto';
import { AddressDto } from './address.dto';

export class CustomerDto {
  @ApiProperty()
  address: AddressDto;

  @ApiProperty()
  balance?: string;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  currency?: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  driverLicense?: DriverLicenseDto;

  @ApiProperty()
  email: string;

  @ApiProperty()
  enrollDate: number; // Unix Timestamp

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
  vip?: string;
}
