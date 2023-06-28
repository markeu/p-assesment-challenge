import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { RankingDto } from './ranking.dto';
import { RankingType } from './ranking.type';

@Injectable()
export class RankingService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async getRanking(rankingDto: RankingDto): Promise<RankingType> {
        const cachedData = await this.cacheService.get<RankingType>(
            rankingDto.date.toString(),
        );
        if (cachedData) {
            console.log(`Getting data from cache!`);
            return this.filterAndLimitData(
                cachedData,
                rankingDto.language,
                rankingDto.limit,
            );
        }

        const { data } = await this.httpService.axiosRef.get(
            `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${rankingDto.date}.csv`,
        );

        const jsonData = this.csvToJson(data);
        await this.cacheService.set(rankingDto.date.toString(), jsonData);
        const filteredData = this.filterAndLimitData(
            jsonData,
            rankingDto.language,
            rankingDto.limit,
        );

        return filteredData;
    }

    private csvToJson(csvData: string): RankingType {
        const lines = csvData.split(/\r?\n/);
        const headers = lines[0].split(',');

        return lines.slice(1).map((line) => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });
            return obj;
        });
    }

    private filterAndLimitData(
        data: RankingType,
        language: string,
        limit: number,
    ): RankingType {
        const lowerCaseLanguage = language.toLowerCase();

        return data
            .filter(
                (item) => item.language?.toLowerCase() === lowerCaseLanguage,
            )
            .sort((a, b) => a.rank.localeCompare(b.rank))
            .slice(0, limit);
    }
}
