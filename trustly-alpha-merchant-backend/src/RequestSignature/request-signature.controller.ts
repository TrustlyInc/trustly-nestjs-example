import { Body, Controller, Get, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiParam, ApiCreatedResponse} from '@nestjs/swagger'
import { RequestSignatureService } from './request-signature.service';
import { EstablishDto } from '../Dtos/establish.dto';
import { CustomerDto } from 'src/Dtos/customer.dto';
import { AddressDto } from 'src/Dtos/address.dto';

@Controller()
export class RequestSignatureController {
  constructor(private readonly requestSignatureService: RequestSignatureService, private readonly configService: ConfigService) {}

  ACCESS_KEY = this.configService.get<String>('ACCESS_KEY')

  @Get('/signature')
  getHello(): string {
    return 'Hello Signature';
  }

  @Post('/signature')
  @ApiParam({name: 'establish', required: true, schema: new EstablishDto() })
  @ApiCreatedResponse({
    type: String,
  })
  createRequestSignature(@Body() establish: EstablishDto, @Req() req: RawBodyRequest<Request>): string {
      let rawBody = req.rawBody;

      if (rawBody){
        let json = JSON.parse(rawBody.toString());

        if(json['customer.name']){
          let address = new AddressDto();
          address.country = json['customer.address.country'];
  
          let customer = new CustomerDto();
          customer.name = json['customer.name'];
          customer.address = address;
  
          establish.customer = customer;
        }
        
      }

    return this.requestSignatureService.getRequestSignature(establish, this.ACCESS_KEY as string);
  }
}