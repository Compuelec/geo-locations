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

  @Get()
  async findAll(): Promise<any> {
    return this.locationService.getAllLocations();
  }

  @Get('lat/:lat/lng/:lng')
  async findLocationByLatAndLng(
    @Param('lat') lat: number,
    @Param('lng') lng: number,
  ): Promise<any> {
    return this.locationService.findLocationByLatAndLng(lat, lng);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.locationService.getLocationById(id);
  }
}
