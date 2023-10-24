import { ApiProperty } from "@nestjs/swagger";
import { PaymentDto } from "./payment.dto";
import { PaymentProviderTransactionDto } from "./paymentProviderTransaction.dto";

export class TransactionDto {
    @ApiProperty()
    transactionId: String;
    @ApiProperty()
    originalTransactionId: String;
    @ApiProperty()
    transactionType: number;
    @ApiProperty()
    currency: String;
    @ApiProperty()
    amount: String;
    @ApiProperty()
    pending: String;
    @ApiProperty()
    paid: String;
    @ApiProperty()
    refunded: String;
    @ApiProperty()
    reversed: String;
    @ApiProperty()
    balance: String;
    @ApiProperty()
    status: number;
    @ApiProperty()
    statusMessage: String;
    @ApiProperty()
    ip: String;
    @ApiProperty()
    createdAt: number;
    @ApiProperty()
    processedAt: number;
    @ApiProperty()
    completedAt: number;
    @ApiProperty()
    updatedAt: number;
    @ApiProperty()
    ppTrxId: String;
    @ApiProperty()
    merchantReference: String;
    @ApiProperty()
    automaticRepresentment: boolean;
    @ApiProperty()
    recordVersion: number;
    @ApiProperty()
    instantPayoutSettle: boolean;
    @ApiProperty()
    payment: PaymentDto;
    @ApiProperty()
    paymentProviderTransaction: PaymentProviderTransactionDto;
    @ApiProperty()
    splitToken: String;
}
