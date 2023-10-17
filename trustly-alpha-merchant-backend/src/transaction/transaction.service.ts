import { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError, firstValueFrom } from 'rxjs';
import { PaymentDetailDto } from '../Dtos/paymentDetail.dto';
import { TransactionDto } from '../Dtos/transaction.dto';
import { NotificationDto } from 'src/Dtos/notification.dto';
import { CaptureDto } from 'src/Dtos/capture.dto';

@Injectable()
export class TransactionService {

    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {}

    private readonly CAPTURE_TRANSACTION_TYPE = "3";
    private readonly CAPTURE_STATUS_COMPLETED = 4;

    BASE_URL = this.configService.get<String>('TRUSTLY_BASE_URL')
    ACCESS_ID = this.configService.get<String>('ACCESS_ID')
    ACCESS_KEY = this.configService.get<String>('ACCESS_KEY')

    requestConfig:AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
        auth: {
          username: this.ACCESS_ID as string,
          password: this.ACCESS_KEY as string
        },
      };

      // Get transaction from Trustly endpoint
      async getTrustlyTransactionBy(transactionId: String): Promise<TransactionDto> {
        const { data } = await firstValueFrom(
          this.http.get<{transaction:TransactionDto}>(`${this.BASE_URL}/transactions/${transactionId}`, this.requestConfig).pipe(
            catchError((error: AxiosError) => {
              throw 'An error happened!';
            }),
          ),
        );

        return data.transaction;
      }

      async getTransactionBy(transactionId: String): Promise<TransactionDto> {
        // Retrieve transaction from the local storage/database.
        
        return new TransactionDto();
      }

      async getPaymentDetailBy(transactionId: String): Promise<PaymentDetailDto> {
        let transaction = await this.getTrustlyTransactionBy(transactionId);

        // Save transaction in the local storage/database.
        // await this.saveOrUpdateTransaction(transaction);

        return PaymentDetailDto.build(transaction);

      }

      async saveTransactionNotification(notification: NotificationDto) {

        if(notification.transactionType === this.CAPTURE_TRANSACTION_TYPE && notification.status == this.CAPTURE_STATUS_COMPLETED) {
          await this.finishCapture(notification);
          return;
        }

        let transaction = await this.getTransactionBy(notification.objectId);

        if(transaction !== null) {
          transaction.status =  Number(notification.status);
          transaction.statusMessage = notification.statusMessage;
          transaction.transactionType = Number(notification.transactionType);
          transaction.splitToken = notification.splitToken;
        }

        // Save transaction in the local storage/database.
        // this.saveOrUpdateTransaction(transaction);

      }

      async capture(transactionId: string, capture: CaptureDto) {

        let transaction = await this.getTransactionBy(transactionId);

        if (document !== null) {
          capture.splitToken = transaction.splitToken;
        }

        return this.http
          .post<{transaction:TransactionDto}>(`${this.BASE_URL}/transactions/${transactionId}/capture`, capture, this.requestConfig)
          .pipe(
            map((res) => {
                return res.data.transaction;
            }),
          )
          .pipe(
            catchError((error) => {
              throw new BadRequestException(error.response.data)
            }),
          );
      }

      private async finishCapture(notification: NotificationDto){
        let transaction = await this.getTrustlyTransactionBy(notification.objectId);
        // Save transaction in the local storage/database.
        // this.saveOrUpdateTransaction(transaction);
      }
}
