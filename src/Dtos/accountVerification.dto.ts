import { ApiProperty } from "@nestjs/swagger";

export class AccountVerificationDto {
    @ApiProperty()
    verified: boolean;
    @ApiProperty()
    type: number;
    @ApiProperty()
    hasEnoughFunds: boolean;
    @ApiProperty()
    verificationDate: number;
}
