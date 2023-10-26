import { ApiProperty } from "@nestjs/swagger";

export class CaptureDto {
    @ApiProperty()
    merchantReference: String;
    @ApiProperty()
    amount: String;
    @ApiProperty()
    splitToken: String;
}