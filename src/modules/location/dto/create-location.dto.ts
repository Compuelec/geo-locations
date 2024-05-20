import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsString()
  flag: string;

  @IsString()
  mapUrl: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  suburb: string;

  @IsString()
  building: string;

  @IsString()
  road: string;

  @IsString()
  house_number: string;

  @IsString()
  countryCode: string;

  @IsString()
  county: string;

  @IsString()
  formatted: string;
}
