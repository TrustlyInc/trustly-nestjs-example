import { ApiProperty } from "@nestjs/swagger"

export class PasskeyRegisterDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    transactionId: string
}