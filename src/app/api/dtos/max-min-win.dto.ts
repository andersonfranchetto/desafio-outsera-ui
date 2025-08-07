export class MaxMinWinDto {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;

    constructor() {
        this.producer = '';
        this.interval = 0;
        this.previousWin = 0;
        this.followingWin = 0;
    }
}
