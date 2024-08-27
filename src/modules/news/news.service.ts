import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { lastValueFrom } from 'rxjs';
import axiosRetry from 'axios-retry';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    private httpService: HttpService,
  ) {
    // Configurar reintentos para Axios
    axiosRetry(this.httpService.axiosRef, {
      retries: 3, // Número de reintentos
      retryDelay: (retryCount) => {
        return retryCount * 2000; // Retraso de 1 segundo por reintento
      },
      retryCondition: (error) => {
        // Reintentar solo en errores de límite de tasa
        return error.response && error.response.status === 429;
      },
    });
  }

  async fetchAndSaveNews(): Promise<void> {
    const response = await lastValueFrom(
      this.httpService.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.TOKEN_NEWS_API}&q=chile&country=cl&language=es&category=education,other,politics,sports,top`,
      ),
    );
    const newsData = response.data.results;

    for (const article of newsData) {
      await this.create({
        ...article,
        keywords: article.keywords || '',
        description: article.description || '',
        creator: article.creator || '',
        source_icon: article.source_icon || '',
        image_url: article.image_url || '',
      });
    }

    return newsData;
  }

  async create(newsData: Partial<News>): Promise<News> {
    const news = this.newsRepository.create(newsData);
    if (newsData.article_id) {
      const existingNews = await this.newsRepository.findOne({
        where: {
          article_id: newsData.article_id,
        },
      });
      if (existingNews) {
        return existingNews;
      }
    }
    return this.newsRepository.save(news);
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async findByDate(date: string): Promise<News[]> {
    const startDate =
      new Date(date).getFullYear() +
      '-' +
      (new Date(date).getMonth() + 1) +
      '-' +
      new Date(date).getUTCDate() +
      ' 00:00:00';
    const endDate =
      new Date(date).getFullYear() +
      '-' +
      (new Date(date).getMonth() + 1) +
      '-' +
      new Date(date).getUTCDate() +
      ' 23:59:59';

    const queryBuilder = this.newsRepository.createQueryBuilder('news');

    return queryBuilder
      .where('news.pubDate >= :startOfDay', { startOfDay: startDate })
      .andWhere('news.pubDate <= :endOfDay', { endOfDay: endDate })
      .getMany();
  }
}
