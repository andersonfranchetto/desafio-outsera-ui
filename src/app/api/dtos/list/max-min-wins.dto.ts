import { MaxMinWinDto } from '../max-min-win.dto';

export class MaxMinWinnersDto {
    min: MaxMinWinDto[];
    max: MaxMinWinDto[];

    constructor() {
        this.min = [];
        this.max = [];
    }
}
