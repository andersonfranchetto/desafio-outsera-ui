import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';
import { ByYeaWinDto } from './dtos/by-year-win.dto';
import { MaxMinWinnersDto } from './dtos/list/max-min-wins.dto';
import { StudiosWinnersDto } from './dtos/list/studio-wins.dto';
import { YearWinnersDto } from './dtos/list/year-wins.dto';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private readonly _http: HttpClient) {}

    getStudiosWinners(): Observable<StudiosWinnersDto> {
        const headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
        return this._http.get<StudiosWinnersDto>(`${environment.apiUrl}/api/movies/studiosWithWinCount`, {
            headers,
        });
    }

    getYearsWithMultipleWinners(): Observable<YearWinnersDto> {
        const headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
        return this._http.get<YearWinnersDto>(`${environment.apiUrl}/api/movies/yearsWithMultipleWinners`, {
            headers,
        });
    }

    getMaxMinWinIntervalForProducers(): Observable<MaxMinWinnersDto> {
        const headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
        return this._http.get<MaxMinWinnersDto>(`${environment.apiUrl}/api/movies/maxMinWinIntervalForProducers`, {
            headers,
        });
    }

    getWinnersByYear(year: number): Observable<ByYeaWinDto[]> {
        const headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
        const httpParams = new HttpParams().set('year', year.toString());

        return this._http.get<ByYeaWinDto[]>(`${environment.apiUrl}/api/movies/winnersByYear?`, {
            params: httpParams,
            headers,
        });
    }
}
