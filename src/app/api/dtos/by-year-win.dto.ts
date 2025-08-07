export class ByYeaWinDto {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;

    constructor() {
        this.id = 0;
        this.year = 0;
        this.title = '';
        this.studios = [];
        this.producers = [];
        this.winner = false;
    }
}
