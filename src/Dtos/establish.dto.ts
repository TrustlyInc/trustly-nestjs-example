import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from './account.dto';
import { MetaDataDto } from './meta.dto';
import { RecurrenceDto } from './recurrence.dto';
import { VerificationDto } from './verification.dto';
import { CustomerDto } from './customer.dto';

export class EstablishDto {
  @ApiProperty()
  accessId: any;

  @ApiProperty()
  account: AccountDto;

  @ApiProperty()
  amount: any;

  @ApiProperty()
  cancelUrl: any;

  @ApiProperty()
  currency: any;

  @ApiProperty()
  customer: CustomerDto;

  @ApiProperty()
  description: any;

  @ApiProperty()
  displayAmount: any;

  @ApiProperty()
  env: any;

  @ApiProperty()
  localUrl: any;

  @ApiProperty()
  merchantId: any;

  @ApiProperty()
  merchantReference: any;

  @ApiProperty()
  metadata: MetaDataDto;

  @ApiProperty()
  minimumBalance: any;

  @ApiProperty()
  paymentType: string;

  @ApiProperty()
  recurrence: RecurrenceDto;

  @ApiProperty()
  returnUrl: any;

  @ApiProperty()
  timeZone: any;

  @ApiProperty()
  transactionId: any;

  @ApiProperty()
  verification: VerificationDto;
}

export interface EstablishDto {
  [key: string]: string | object;
}
