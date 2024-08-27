import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() newsData: Partial<News>): Promise<News> {
    return this.newsService.create(newsData);
  }

  @Get()
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('fetch')
  async fetchAndSaveNews(): Promise<void> {
    return this.newsService.fetchAndSaveNews();
  }

  @Get(':date')
  async finDate(@Param('date') date: string): Promise<News[]> {
    return this.newsService.findByDate(date);
  }
}
