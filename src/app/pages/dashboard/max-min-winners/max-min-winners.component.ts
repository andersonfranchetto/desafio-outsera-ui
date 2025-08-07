import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from '@lib/services/message.service';
import { DashboardService } from 'src/app/api/dashboard.service';
import { MaxMinWinnersDto } from 'src/app/api/dtos/list/max-min-wins.dto';

@Component({
    selector: 'app-max-min-winners',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './max-min-winners.component.html',
})
export class MaxMinWinnersComponent implements OnInit {
    maxMinWinners: MaxMinWinnersDto;

    constructor(private readonly _dashboardService: DashboardService, private readonly messageService: MessageService) {
        this.maxMinWinners = new MaxMinWinnersDto();
    }

    ngOnInit(): void {
        this.showmaxMinWinners();
    }

    showmaxMinWinners(): void {
        this._dashboardService.getMaxMinWinIntervalForProducers().subscribe({
            next: (response: MaxMinWinnersDto) => {
                this.maxMinWinners = response;
            },
            error: () => {
                this.messageService.error(
                    'Erro ao buscar os produtores com maior e menor intervalo entre vitórias!',
                    'error',
                );
            },
        });
    }

    getIntervalInYears(years: number): string {
        return `${years} Ano${years !== 1 ? 's' : ''}`;
    }
}
