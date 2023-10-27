import { ApiProperty } from "@nestjs/swagger";

export class PasskeyRequestDto {
    @ApiProperty()
    clientDataJSON: string
    @ApiProperty()
    credentialID: string
    @ApiProperty()
    authenticatorData: string
    @ApiProperty()
    attestationObject: string
    @ApiProperty()
    signature: string
    @ApiProperty()
    userID: string
}