import { ApiProperty } from "@nestjs/swagger";

export class PaymentProviderTransactionDto {
    @ApiProperty()
    paymentProviderTransactionId: string;
    @ApiProperty()
    signature: string;
    @ApiProperty()
    status: string;
}
