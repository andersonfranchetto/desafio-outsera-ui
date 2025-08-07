import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from '@env/environment.development';
import { PageableDto, PaginatedMovieDto, SortDto } from './dtos/paginated-movie.dto';

describe('MovieService', () => {
    let service: MovieService;
    let httpMock: HttpTestingController;

    const API = `${environment.apiUrl}/api/movies`;

    const mockResponse: PaginatedMovieDto = {
        empty: false,
        first: false,
        last: false,
        number: 0,
        numberOfElements: 0,
        pageable: new PageableDto(),
        sort: new SortDto(),
        content: [],
        size: 5,
        totalElements: 0,
        totalPages: 0,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MovieService],
        });

        service = TestBed.inject(MovieService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getMovies with required params only (page, size)', () => {
        service.getMovies({ page: 2, size: 10 }).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne((r) => {
            return (
                r.url === API &&
                r.params.get('page') === '1' && // page - 1
                r.params.get('size') === '10' &&
                !r.params.has('winner') &&
                !r.params.has('year')
            );
        });

        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockResponse);
    });

    it('should call getMovies with winner and year params', () => {
        service.getMovies({ page: 1, size: 5, winner: true, year: 1984 }).subscribe((res) => {
            expect(res).toEqual(mockResponse);
        });

        const req = httpMock.expectOne((r) => {
            return (
                r.url === API &&
                r.params.get('page') === '0' &&
                r.params.get('size') === '5' &&
                r.params.get('winner') === 'true' &&
                r.params.get('year') === '1984'
            );
        });

        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockResponse);
    });
});
