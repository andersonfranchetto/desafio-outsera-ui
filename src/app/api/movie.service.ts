import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';
import { PaginatedMovieDto } from './dtos/paginated-movie.dto';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    constructor(private readonly _http: HttpClient) {}

    getMovies(filter: { page: number; size: number; winner?: boolean; year?: number }): Observable<PaginatedMovieDto> {
        const headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
        let httpParams = new HttpParams().set('page', filter.page - 1).set('size', filter.size);
        if (filter.winner !== undefined) httpParams = httpParams.set('winner', filter.winner);
        if (filter.year !== undefined) httpParams = httpParams.set('year', filter.year);

        return this._http.get<PaginatedMovieDto>(`${environment.apiUrl}/api/movies`, {
            params: httpParams,
            headers,
        });
    }
}
