import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from '@lib/services/message.service';
import { finalize } from 'rxjs/operators';
import { DashboardService } from 'src/app/api/dashboard.service';
import { ByYeaWinDto } from 'src/app/api/dtos/by-year-win.dto';

@Component({
    selector: 'app-by-year-winners',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './by-year-winners.component.html',
})
export class ByYearWinnersComponent implements OnInit {
    byYearWinners: ByYeaWinDto[] = [];

    searchYear: number | null = new Date().getFullYear();

    isLoading: boolean;

    yearsAvailable: number[] = [];

    constructor(private readonly _dashboardService: DashboardService, private readonly messageService: MessageService) {
        this.isLoading = false;
    }

    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        const startYear = 1950;

        this.yearsAvailable = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();
    }

    searchByYear(): void {
        if (this.searchYear) {
            this.showByYearWinners(this.searchYear);
        } else {
            this.messageService.error('Ano de pesquisa não foi informado. Selecione!', 'Vencedores por ano');
        }
    }

    showByYearWinners(year: number): void {
        this.isLoading = true;

        this._dashboardService
            .getWinnersByYear(year)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (response: ByYeaWinDto[]) => {
                    this.byYearWinners = response;
                },
                error: () => {
                    this.messageService.error('Erro ao buscar os estúdios vencedores por ano!', 'Vencedores por ano');
                    this.byYearWinners = [];
                },
            });
    }
}
