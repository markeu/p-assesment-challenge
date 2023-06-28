import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
    constructor(private readonly service: RankingService) {}

    @UseInterceptors(CacheInterceptor)
    @Get('/:date')
    async getRanking(@Param('date') date: string): Promise<any> {
        return await this.service.getRanking(date);
    }
}
