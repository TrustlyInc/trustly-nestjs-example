import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UserDto {
    @ApiProperty()
    id: UUID;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    registered: boolean;
    @ApiProperty()
    lastTransactionAuth: string;

}