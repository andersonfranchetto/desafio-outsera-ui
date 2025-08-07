import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from '@lib/services/message.service';
import { DashboardService } from 'src/app/api/dashboard.service';
import { YearWinnersDto } from 'src/app/api/dtos/list/year-wins.dto';
import { YearWinDto } from 'src/app/api/dtos/year-win.dto';

@Component({
    selector: 'app-multiple-winners',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './multiple-winners.component.html',
})
export class MultipleWinnersComponent implements OnInit {
    yearsWinners: YearWinnersDto;

    constructor(private readonly _dashboardService: DashboardService, private readonly messageService: MessageService) {
        this.yearsWinners = new YearWinnersDto();
    }

    ngOnInit(): void {
        this.showYearsWinners();
    }

    showYearsWinners(): void {
        this._dashboardService.getYearsWithMultipleWinners().subscribe({
            next: (response: YearWinnersDto) => {
                let years = response.years;
                if (!this.isSortedDescendingByWinCount(response.years)) {
                    years = response.years.sort((a, b) => b.winnerCount - a.winnerCount);
                }
                response.years = years.slice(0, 3);
                this.yearsWinners = response;
            },
            error: () => {
                this.messageService.error('Erro ao buscar os maiores vencedores por ano!', 'Vencedores por ano');
            },
        });
    }

    isSortedDescendingByWinCount(years: YearWinDto[]): boolean {
        return !years.some((year, i) => i < years.length - 1 && year.winnerCount < years[i + 1].winnerCount);
    }
}
