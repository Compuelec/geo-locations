import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async createLocation(createLocationDto: CreateLocationDto) {
    const lat = createLocationDto.lat;
    const lng = createLocationDto.lng;

    const location = await this.locationRepository.findOne({
      where: { lat, lng },
    });

    if (location) {
      throw new Error(`Location with lat ${lat} and lng ${lng} already exists`);
    }

    return this.locationRepository.save(createLocationDto);
  }

  async findLocationByLatAndLng(lat: number, lng: number): Promise<Location> {
    const epsilon = 0.001;

    const location = await this.locationRepository
      .createQueryBuilder('location')
      .where('ABS(location.lat - :lat) < :epsilon', { lat, epsilon })
      .andWhere('ABS(location.lng - :lng) < :epsilon', { lng, epsilon })
      .getOne();

    if (!location) {
      return null;
    }

    return location;
  }

  async findLocation(location: string): Promise<Location[]> {
    const locations = await this.locationRepository
      .createQueryBuilder('location')
      .where('location.formatted ILIKE :location', {
        location: `%${location}%`,
      })
      .getMany();

    if (!locations.length) {
      return [];
    }

    return locations;
  }

  async getAllLocations(): Promise<any> {
    const locations = await this.locationRepository.find();
    return locations;
  }

  async getLocationById(id: number): Promise<any> {
    const location = await this.locationRepository.findOne({ where: { id } });

    if (!location) {
      throw new Error(`Location with id ${id} not found`);
    }
    return location;
  }
}
