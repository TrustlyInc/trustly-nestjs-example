import { ApiProperty } from "@nestjs/swagger";
import { MerchantDto } from "./merchant.dto";
import { CustomerDto } from "./customer.dto";
import { AccountDto } from "./account.dto";
import { PaymentProviderDto } from "./paymentProvider.dto";
import { AuthDto } from "./auth.dto";

export class PaymentDto {
    @ApiProperty()
    paymentId: string;
    @ApiProperty()
    paymentType: number;
    @ApiProperty()
    system: number;
    @ApiProperty()
    country: string;
    @ApiProperty()
    authorization: string;
    @ApiProperty()
    authorizationStatus: number;
    @ApiProperty()
    authorizationStatusMessage: string;
    @ApiProperty()
    pending: string;
    @ApiProperty()
    paid: string;
    @ApiProperty()
    refunded: string;
    @ApiProperty()
    reversed: string;
    @ApiProperty()
    balance: string;
    @ApiProperty()
    createdAt: number;
    @ApiProperty()
    updatedAt: number;
    @ApiProperty()
    recordVersion: number;
    @ApiProperty()
    paymentFlow: number;
    @ApiProperty()
    fingerprint: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    amount: string;
    @ApiProperty()
    paymentProviderSubtype: number;
    @ApiProperty()
    merchant: MerchantDto;
    @ApiProperty()
    customer: CustomerDto;
    @ApiProperty()
    account: AccountDto;
    @ApiProperty()
    paymentProvider: PaymentProviderDto;
    @ApiProperty()
    allowedPaymentProviderType: [];
    @ApiProperty()
    auth: AuthDto;
}