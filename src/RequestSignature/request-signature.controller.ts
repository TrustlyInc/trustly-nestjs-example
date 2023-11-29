import { Body, Controller, Get, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiParam, ApiCreatedResponse} from '@nestjs/swagger'
import { RequestSignatureService } from './request-signature.service';
import { EstablishDto } from '../Dtos/establish.dto';
import { normalizeEstablishData } from './request-signature.utils';


@Controller()
export class RequestSignatureController {
  constructor(private readonly requestSignatureService: RequestSignatureService, private readonly configService: ConfigService) {}

  ACCESS_KEY = this.configService.get<String>('ACCESS_KEY')

  @Post('/signature')
  @ApiParam({name: 'establish', required: true, schema: new EstablishDto() })
  @ApiCreatedResponse({
    type: String,
  })
  createRequestSignature(@Body() establish: EstablishDto, @Req() req: RawBodyRequest<Request>): string {
      let rawBody = req.rawBody;

      if (rawBody){

        establish = normalizeEstablishData(establish, rawBody.toString());
        
      }

    return this.requestSignatureService.getRequestSignature(establish, this.ACCESS_KEY as string);
  }
}