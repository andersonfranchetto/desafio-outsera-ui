import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { environment } from '@env/environment.development';
import { StudiosWinnersDto } from './dtos/list/studio-wins.dto';
import { YearWinnersDto } from './dtos/list/year-wins.dto';
import { MaxMinWinnersDto } from './dtos/list/max-min-wins.dto';
import { ByYeaWinDto } from './dtos/by-year-win.dto';

describe('DashboardService', () => {
    let service: DashboardService;
    let httpMock: HttpTestingController;

    const API = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DashboardService],
        });

        service = TestBed.inject(DashboardService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getStudiosWinners with correct URL and headers', () => {
        const mockResponse: StudiosWinnersDto = { studios: [] };
        service.getStudiosWinners().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${API}/api/movies/studiosWithWinCount`);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockResponse);
    });

    it('should call getYearsWithMultipleWinners with correct URL and headers', () => {
        const mockResponse: YearWinnersDto = { years: [] };
        service.getYearsWithMultipleWinners().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${API}/api/movies/yearsWithMultipleWinners`);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockResponse);
    });

    it('should call getMaxMinWinIntervalForProducers with correct URL and headers', () => {
        const mockResponse: MaxMinWinnersDto = { min: [], max: [] };
        service.getMaxMinWinIntervalForProducers().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${API}/api/movies/maxMinWinIntervalForProducers`);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockResponse);
    });

    it('should call getWinnersByYear with correct URL, headers and params', () => {
        const mockResponse: ByYeaWinDto[] = [
            {
                id: 1,
                producers: ['A'],
                studios: ['A'],
                title: 'AB',
                winner: false,
                year: 1980,
            },
        ];
        const year = 2024;

        service.getWinnersByYear(year).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(
            (r) => r.url === `${API}/api/movies/winnersByYear?` && r.params.get('year') === '2024',
        );

        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockResponse);
    });
});
