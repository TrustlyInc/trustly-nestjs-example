import { ApiProperty } from "@nestjs/swagger";

export class RecurrenceDto {
    @ApiProperty()
    startDate: any;
    @ApiProperty()
    endDate: any;
    @ApiProperty()
    frequency: any;
    @ApiProperty()
    frequencyUnit: any;
    @ApiProperty()
    frequencyUnitType: any;
    @ApiProperty()
    recurringAmount: any;
    @ApiProperty()
    automaticCapture: any;
}
