import { ApiProperty } from "@nestjs/swagger";

export class PaymentProviderDto {
    @ApiProperty()
    paymentProviderId: string;
    @ApiProperty()
    type: number;
    @ApiProperty()
    subtype: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    instantPayoutAvailable: boolean;
}