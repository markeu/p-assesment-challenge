import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RankingService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async getRanking(date: string): Promise<any> {
        // check if data is in cache:
        const cachedData = await this.cacheService.get<any>(date.toString());
        if (cachedData) {
            console.log(`Getting data from cache!`);
            return cachedData;
        }

        // if not, call API and set the cache:
        const { data } = await this.httpService.axiosRef.get(
            `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`,
        );

        const jsonData = this.csvToJson(data);
        await this.cacheService.set(date.toString(), jsonData);

        return jsonData;
    }

    private csvToJson(csvData: string): any[] {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');

        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj: any = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = values[j];
            }
            result.push(obj);
        }

        return result;
    }
}

// export default new RankingService();
