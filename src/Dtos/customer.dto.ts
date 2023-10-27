import { ApiProperty } from "@nestjs/swagger";
import { DriverLicenseDto } from './driveLicense.dto';
import { AddressDto } from './address.dto';

export class CustomerDto {
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    externalId: string;
    @ApiProperty()
    merchantId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    vip: string;
    @ApiProperty()
    taxId: string;
    @ApiProperty()
    driverLicense: DriverLicenseDto;
    @ApiProperty()
    address: AddressDto;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    balance: any;
    @ApiProperty()
    currency: any;
    @ApiProperty()
    enrollDate: number;
    @ApiProperty()
    dateOfBirth: number;
    @ApiProperty()
    createdAt: number;
    @ApiProperty()
    updatedAt: number;
}
