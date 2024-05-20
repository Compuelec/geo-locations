import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float', { nullable: true })
  lat: number;

  @Column('float', { nullable: true })
  lng: number;

  @Column({ nullable: true })
  mapUrl: string;

  @Column({ nullable: true })
  flag: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  suburb: string;

  @Column({ nullable: true })
  building: string;

  @Column({ nullable: true })
  road: string;

  @Column({ nullable: true })
  house_number: string;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  county: string;

  @Column({ nullable: true })
  formatted: string;
}
