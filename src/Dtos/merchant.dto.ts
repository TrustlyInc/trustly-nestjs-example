import { ApiProperty } from "@nestjs/swagger";

export class MerchantDto {
    @ApiProperty()
    merchantId: string;
}