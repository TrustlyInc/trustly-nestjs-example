import { ApiProperty } from "@nestjs/swagger";
import { AccountDto } from './account.dto';
import { MetaDataDto } from './meta.dto';
import { RecurrenceDto } from './recurrence.dto';
import { VerificationDto } from './verification.dto';
import { CustomerDto } from './customer.dto';

export class EstablishDto {
    @ApiProperty()
    accessId: any;
    @ApiProperty()
    merchantId: any;
    @ApiProperty()
    description: any;
    @ApiProperty()
    currency: any;
    @ApiProperty()
    amount: any;
    @ApiProperty()
    displayAmount: any;
    @ApiProperty()
    minimumBalance: any;
    @ApiProperty()
    merchantReference: any;
    @ApiProperty()
    paymentType: string;
    @ApiProperty()
    timeZone: any;
    @ApiProperty()
    returnUrl: any;
    @ApiProperty()
    cancelUrl: any;
    @ApiProperty()
    env: any;
    @ApiProperty()
    localUrl: any;
    @ApiProperty()
    metadata: MetaDataDto;
    @ApiProperty()
    recurrence: RecurrenceDto;
    @ApiProperty()
    verification: VerificationDto;
    @ApiProperty()
    customer: CustomerDto;
    @ApiProperty()
    account: AccountDto;
    @ApiProperty()
    transactionId: any;
}