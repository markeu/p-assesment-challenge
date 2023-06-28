import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class RankingDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    language: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    limit: number;
}
