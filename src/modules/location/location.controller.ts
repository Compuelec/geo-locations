import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Get('all')
  async findAll(): Promise<any> {
    return this.locationService.getAllLocations();
  }

  @Get('/:lat/:lng')
  async findLocationByLatAndLng(
    @Param('lat') lat: number,
    @Param('lng') lng: number,
  ): Promise<any> {
    return this.locationService.findLocationByLatAndLng(lat, lng);
  }

  @Get(':location')
  async findLocation(@Param('location') location: string): Promise<any> {
    return this.locationService.findLocation(location);
  }

  @Get('_id/:_id')
  async findOne(@Param('_id') _id: string): Promise<any> {
    return this.locationService.getLocationById(_id);
  }
}
