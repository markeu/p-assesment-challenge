import { RankingService } from '../ranking.service';

// Mock the HttpService and Cache
jest.mock('@nestjs/axios');
const mockHttpService = {
    axiosRef: {
        get: jest.fn(),
    },
};
const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
};

describe('RankingService', () => {
    let rankingService: RankingService;

    beforeEach(() => {
        rankingService = new RankingService(
            mockHttpService as any,
            mockCacheService as any,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getRanking', () => {
        it('should return data from cache if available', async () => {
            const cachedData = [{ rank: '1', language: 'JavaScript' }];
            mockCacheService.get.mockResolvedValue(cachedData);

            const rankingDto = {
                date: '2022-01-01',
                language: 'JavaScript',
                limit: 10,
            };
            const result = await rankingService.getRanking(rankingDto);

            expect(mockCacheService.get).toHaveBeenCalledWith('2022-01-01');
            expect(mockHttpService.axiosRef.get).not.toHaveBeenCalled();
            expect(result).toEqual(cachedData);
        });

        it('should fetch data from API and set cache if not available in cache', async () => {
            const apiData = 'rank,language\n1,JavaScript\n2,Python';
            const jsonData = [
                { rank: '1', language: 'JavaScript' },
                { rank: '2', language: 'Python' },
            ];
            mockHttpService.axiosRef.get.mockResolvedValue({ data: apiData });
            mockCacheService.get.mockResolvedValue(null);

            const rankingDto = {
                date: '2022-01-01',
                language: 'JavaScript',
                limit: 10,
            };
            const result = await rankingService.getRanking(rankingDto);

            expect(mockCacheService.get).toHaveBeenCalledWith('2022-01-01');
            expect(mockHttpService.axiosRef.get).toHaveBeenCalledWith(
                'https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-2022-01-01.csv',
            );
            expect(mockCacheService.set).toHaveBeenCalledWith(
                '2022-01-01',
                jsonData,
            );
            console.log(result, jsonData);
        });
    });
});
