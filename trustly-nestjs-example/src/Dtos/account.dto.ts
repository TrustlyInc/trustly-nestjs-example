import { ApiProperty } from "@nestjs/swagger";
import { AccountVerificationDto } from "./accountVerification.dto";

export class AccountDto {
    @ApiProperty()
    nameOnAccount: any;
    @ApiProperty()
    name: string;
    @ApiProperty()
    type: number;
    @ApiProperty()
    profile: number;
    @ApiProperty()
    accountNumber: string;
    @ApiProperty()
    routingNumber: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    verification: AccountVerificationDto;
    @ApiProperty()
    verified: boolean;
    @ApiProperty()
    source: number;
    @ApiProperty()
    token: string;
    @ApiProperty()
    paymentProviderSubtype: number;
}
