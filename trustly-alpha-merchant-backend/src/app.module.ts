import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RequestSignatureController } from './RequestSignature/request-signature.controller';
import { RequestSignatureService } from './RequestSignature/request-signature.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TransactionModule
  ],
  controllers: [RequestSignatureController],
  providers: [RequestSignatureService],
})
export class AppModule {}
