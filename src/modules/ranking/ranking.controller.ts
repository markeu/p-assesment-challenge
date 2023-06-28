import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RankingService } from './ranking.service';
import { RankingDto } from './ranking.dto';
import { RankingType } from './ranking.type';
@Controller('ranking')
export class RankingController {
    constructor(private readonly service: RankingService) {}

    @UseInterceptors(CacheInterceptor)
    @Get('/')
    async getRanking(@Query() query: RankingDto): Promise<RankingType> {
        return await this.service.getRanking(query);
    }
}
