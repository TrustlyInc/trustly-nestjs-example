import { ApiProperty } from "@nestjs/swagger";
import { TransactionDto } from "./transaction.dto";
import { AccountDto } from "./account.dto";

export class PaymentDetailDto {
    @ApiProperty()
    transactionId: String;
    @ApiProperty()
    transactionType: String;
    @ApiProperty()
    transactionTypeCode: number;
    @ApiProperty()
    paymentId: String;
    @ApiProperty()
    paymentTypeCode: number;
    @ApiProperty()
    paymentType: String;
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    status: String;
    @ApiProperty()
    paymentProviderId: String;
    @ApiProperty()
    paymentProviderName: String;
    @ApiProperty()
    account: AccountDto;

    static build(transactionDetail: TransactionDto): PaymentDetailDto {
        let paymentDetail = new PaymentDetailDto();
        paymentDetail.transactionId = transactionDetail.transactionId;
        
        paymentDetail.transactionTypeCode = transactionDetail.transactionType;
        paymentDetail.transactionType = PaymentDetailDto.getTransactionType(paymentDetail.transactionTypeCode);

        paymentDetail.statusCode = transactionDetail.status;
        paymentDetail.status = PaymentDetailDto.getTransactionStatus(paymentDetail.statusCode);
        
        const payment = transactionDetail.payment;
        paymentDetail.paymentId = payment.paymentId;

        paymentDetail.paymentTypeCode = payment.paymentType;
        paymentDetail.paymentType = PaymentDetailDto.getPaymentType(paymentDetail.paymentTypeCode);
        paymentDetail.account = payment.account;

        const paymentProvider = payment.paymentProvider;
        paymentDetail.paymentProviderId = paymentProvider.paymentProviderId;
        paymentDetail.paymentProviderName = paymentProvider.name;

        

        return paymentDetail;
    }

    private static getTransactionStatus(status: number): String {
        const transactionStatus = new Map<number, String>([
            [0, "New"],
            [1, "Pending"],
            [2, "Authorized"],
            [3, "Processed"],
            [4, "Completed"],
            [5, "Failed"],
            [6, "Expired"],
            [7, "Canceled"],
            [8, "Denied"],
            [10, "Reversed"],
            [11, "Partially Refunded"],
            [12, "Refunded"],
            [13, "Voided"],
            [14, "On Hold"]
        ]);

        if(transactionStatus.has(status)) {
            return transactionStatus.get(status)!;
        }

        return "None";
    }

    private static getTransactionType(type: number): String {
        const transactionTypes = new Map<number, String>([
            [0, "External"],
            [1, "Authorize"],
            [2, "Pay"],
            [3, "Capture"],
            [4, "Refund"],
            [5, "Reverse"],
            [6, "Deposit"],
            [7, "Reclaim"],
            [8, "Representment"],
            [9, "Tokenization"],
            [10, "Preauthorization"],
            [11, "Guarantee"]
        ]);

        if(transactionTypes.has(type)) {
            return transactionTypes.get(type)!;
        }

        return "None";
    }

    private static getPaymentType(type: number): String {
        const paymentTypes = new Map<number, String>([
            [2, "Deferred"],
            [3, "Recurring"],
            [4, "Disbursement"],
            [5, "Verification"],
            [6, "Retrieval"]
        ]);

        if(paymentTypes.has(type)) {
            return paymentTypes.get(type)!;
        }

        return "None";
    }
}
