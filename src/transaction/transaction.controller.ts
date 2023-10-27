import { Controller, Get, Query, Post, Body, HttpCode } from '@nestjs/common';
import { ApiParam, ApiCreatedResponse} from '@nestjs/swagger'
import { TransactionService } from './transaction.service';
import { TransactionDto } from 'src/Dtos/transaction.dto';
import { PaymentDetailDto } from 'src/Dtos/paymentDetail.dto';
import { NotificationDto } from 'src/Dtos/notification.dto';
import { EstablishDto } from 'src/Dtos/establish.dto';
import { CaptureDto } from 'src/Dtos/capture.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
    
    @Get('/')
    @ApiCreatedResponse({
      type: TransactionDto,
    })
    getTransactionDetail(@Query('transactionId') transactionId: String): Promise<TransactionDto> {
      console.log(`/getTransactionDetail: ${transactionId}`);
      return this.transactionService.getTransactionBy(transactionId);
    }

    @Get('/paymentDetail')
    @ApiCreatedResponse({
      type: PaymentDetailDto,
    })
    getTransactionPaymentDetail(@Query('transactionId') transactionId: String): Promise<PaymentDetailDto> {
      console.log(`/getTransactionPaymentDetail: ${transactionId}`);
      return this.transactionService.getPaymentDetailBy(transactionId);
    }

    @Post('/notification')
    @HttpCode(200)
    @ApiCreatedResponse({
      type: Object,
    })
    transactionNotification(@Body() notification: NotificationDto): Object {
      console.log(`/notification: ${JSON.stringify(notification)}`);
      return this.transactionService.saveTransactionNotification(notification);
    }

    @Post('/capture')
    @ApiParam({name: 'establish', required: true, schema: new EstablishDto() })
    @ApiCreatedResponse({
      type: Object,
    })
    captureTransaction(@Body() establish: EstablishDto): Object {
      console.log(`/captureTransaction: ${JSON.stringify(establish)}`);

      const transactionId = establish.transactionId;
      
      const data = new CaptureDto();
      data.merchantReference = establish.merchantReference;
      data.amount = establish.amount;

      return this.transactionService.capture(transactionId, data);

    }
}
