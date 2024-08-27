import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  article_id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column('simple-array')
  keywords: string[];

  @Column('simple-array')
  creator: string[];

  @Column({ nullable: true })
  video_url: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  pubDate: Date;

  @Column()
  image_url: string;

  @Column()
  source_id: string;

  @Column()
  source_priority: number;

  @Column()
  source_url: string;

  @Column()
  source_icon: string;

  @Column()
  language: string;

  @Column('simple-array')
  country: string[];

  @Column('simple-array')
  category: string[];

  @Column({ nullable: true })
  ai_tag: string;

  @Column({ nullable: true })
  sentiment: string;

  @Column({ nullable: true })
  sentiment_stats: string;

  @Column({ nullable: true })
  ai_region: string;

  @Column({ nullable: true })
  ai_org: string;
}
