import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from './account.dto';
import { MetaDataDto } from './meta.dto';
import { RecurrenceDto } from './recurrence.dto';
import { VerificationDto } from './verification.dto';
import { CustomerDto } from './customer.dto';

export class EstablishDto {
  @ApiProperty()
  accessId: string;

  @ApiProperty()
  account: AccountDto;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  cancelUrl: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  customer: CustomerDto;

  @ApiProperty()
  description: string;

  @ApiProperty()
  displayAmount: string;

  @ApiProperty()
  env: string;

  @ApiProperty()
  localUrl: string;

  @ApiProperty()
  merchantId: string;

  @ApiProperty()
  merchantReference: string;

  @ApiProperty()
  metadata: MetaDataDto;

  @ApiProperty()
  minimumBalance: number;

  @ApiProperty()
  paymentType: string;

  @ApiProperty()
  recurrence: RecurrenceDto;

  @ApiProperty()
  returnUrl: string;

  @ApiProperty()
  timeZone: any;

  @ApiProperty()
  transactionId: any;

  @ApiProperty()
  verification: VerificationDto;
}

export interface EstablishDto {
  [key: string]: number | object | string;
}
