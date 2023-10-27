import { Injectable } from '@nestjs/common';
import { EstablishDto } from '../Dtos/establish.dto';
import { generateSignature } from './request-signature.utils';

@Injectable()
export class RequestSignatureService {
  getRequestSignature(establishData: EstablishDto, accessKey: string): string {
    return generateSignature(establishData, accessKey);
  }
}
