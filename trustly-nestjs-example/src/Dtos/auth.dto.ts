import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    message: string;
}