import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class PasskeyCredentialDto {
    @ApiProperty()
    status: string;
    @ApiProperty()
    challenge: string;
    @ApiProperty()
    domain: string;
    @ApiProperty()
    user: UserDto;
}