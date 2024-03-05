import {
  Body,
  Controller,
  Post,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiParam, ApiCreatedResponse } from '@nestjs/swagger';
import { RequestSignatureService } from './request-signature.service';
import { normalizeEstablishData } from './request-signature.utils';
import { EstablishDto } from '../Dtos/establish.dto';
import { Response } from 'express';

@Controller()
export class RequestSignatureController {
  constructor(
    private readonly requestSignatureService: RequestSignatureService,
    private readonly configService: ConfigService
  ) {}

  ACCESS_KEY = this.configService.get<String>('ACCESS_KEY');

  @Post('/signature')
  @ApiParam({ name: 'establish', required: true, schema: new EstablishDto() })
  @ApiCreatedResponse({
    type: String,
  })
  createRequestSignature(
    @Body() establish: EstablishDto,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response
  ): object {
    const rawBody = req.rawBody;

    if (rawBody) {
      establish = normalizeEstablishData(establish, rawBody);
    }

    return res.json(
      this.requestSignatureService.getRequestSignature(
        establish,
        this.ACCESS_KEY as string
      )
    );
  }
}
