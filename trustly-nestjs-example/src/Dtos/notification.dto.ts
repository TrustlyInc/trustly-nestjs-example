import { ApiProperty } from "@nestjs/swagger";
import { PaymentProviderTransactionDto } from "./paymentProviderTransaction.dto";

export class NotificationDto {
    @ApiProperty()
    merchantId: String;
    @ApiProperty()
    merchantReference: String;
    @ApiProperty()
    paymentType: String;
    @ApiProperty()
    transactionType: String;
    @ApiProperty()
    eventId: String;
    @ApiProperty()
    eventType: String
    @ApiProperty()
    objectId: String;
    @ApiProperty()
    objectType: String;
    @ApiProperty()
    message: String;
    @ApiProperty()
    timeZone: String;
    @ApiProperty()
    createdAt: number;
    @ApiProperty()
    accessId: String;
    @ApiProperty()
    paymentProviderTransaction: PaymentProviderTransactionDto;
    @ApiProperty()
    status: number;
    @ApiProperty()
    statusMessage: String;
    @ApiProperty()
    splitToken: String;
}
