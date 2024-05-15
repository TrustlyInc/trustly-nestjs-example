import { ApiProperty } from '@nestjs/swagger';

export class RecurrenceDto {
  @ApiProperty()
  automaticCapture: boolean;

  @ApiProperty()
  endDate?: number; // Unix Timestamp

  @ApiProperty()
  frequency?: number;

  @ApiProperty()
  frequencyUnit: number;

  @ApiProperty()
  frequencyUnitType: number;

  @ApiProperty()
  recurringAmount: string;

  @ApiProperty()
  startDate?: number; // Unix Timestamp
}
