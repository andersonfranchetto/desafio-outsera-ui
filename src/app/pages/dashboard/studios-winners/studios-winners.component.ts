import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from 'src/app/api/dashboard.service';
import { StudiosWinnersDto } from 'src/app/api/dtos/list/studio-wins.dto';
import { StudioWinDto } from 'src/app/api/dtos/studio-win.dto';

@Component({
    selector: 'app-studios-winners',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './studios-winners.component.html',
})
export class StudiosWinnersComponent implements OnInit {
    studiosWinners: StudiosWinnersDto;

    constructor(private readonly _dashboardService: DashboardService) {
        this.studiosWinners = new StudiosWinnersDto();
    }

    ngOnInit(): void {
        this.showWinners();
    }

    showWinners(): void {
        this._dashboardService.getStudiosWinners().subscribe({
            next: (response: StudiosWinnersDto) => {
                let studios = response.studios;
                if (!this.isSortedDescendingByWinCount(response.studios)) {
                    studios = response.studios.sort((a, b) => b.winCount - a.winCount);
                }
                response.studios = studios.slice(0, 3);
                this.studiosWinners = response;
            },
            error: (error) => {
                console.error('Erro ao buscar os 3+ estúdios vencedores:', error);
            },
        });
    }

    isSortedDescendingByWinCount(studios: StudioWinDto[]): boolean {
        return !studios.some((studio, i) => i < studios.length - 1 && studio.winCount < studios[i + 1].winCount);
    }
}
