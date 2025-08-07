import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ByYearWinnersComponent } from './by-year-winners/by-year-winners.component';
import { MaxMinWinnersComponent } from './max-min-winners/max-min-winners.component';
import { MultipleWinnersComponent } from './multiple-winners/multiple-winners.component';
import { StudiosWinnersComponent } from './studios-winners/studios-winners.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        StudiosWinnersComponent,
        MultipleWinnersComponent,
        MaxMinWinnersComponent,
        ByYearWinnersComponent,
    ],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
