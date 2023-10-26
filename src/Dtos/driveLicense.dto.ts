import { ApiProperty } from "@nestjs/swagger";
export class DriverLicenseDto {
    @ApiProperty()
    number: string;
    @ApiProperty()
    state: string;
}
