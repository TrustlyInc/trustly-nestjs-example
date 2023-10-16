import { ApiProperty } from "@nestjs/swagger";

export class VerificationDto {
    @ApiProperty()
    status: any;
    @ApiProperty()
    verifyCustomer: any;
    @ApiProperty()
    verified: boolean
}