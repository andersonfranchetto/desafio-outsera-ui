import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MovieComponent } from './movie.component';
import { MovieService } from 'src/app/api/movie.service';
import { PaginatedMovieDto } from 'src/app/api/dtos/paginated-movie.dto';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('List of movies with filters [MovieComponent]', () => {
    let component: MovieComponent;
    let fixture: ComponentFixture<MovieComponent>;
    let movieServiceSpy: jasmine.SpyObj<MovieService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('MovieService', ['getMovies']);

        await TestBed.configureTestingModule({
            imports: [MovieComponent, HttpClientTestingModule],
            providers: [{ provide: MovieService, useValue: spy }],
        }).compileComponents();

        movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
        fixture = TestBed.createComponent(MovieComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getMovies on ngOnInit', () => {
        const getMoviesSpy = spyOn(component, 'getMovies');
        component.ngOnInit();
        expect(getMoviesSpy).toHaveBeenCalled();
    });

    it('getMovies should set paginatedMovies on success and toggle isLoading', fakeAsync(() => {
        const mockResponse = new PaginatedMovieDto();
        mockResponse.totalPages = 3;
        mockResponse.number = 1;
        movieServiceSpy.getMovies.and.returnValue(of(mockResponse));

        component.getMovies();
        expect(component.isLoading).toBeFalse();

        tick();
        expect(component.paginatedMovies).toBe(mockResponse);
        expect(component.isLoading).toBeFalse();
    }));

    it('getMovies should reset paginatedMovies and toggle isLoading on error', fakeAsync(() => {
        movieServiceSpy.getMovies.and.returnValue(throwError(() => new Error('fail')));

        component.getMovies();
        expect(component.isLoading).toBeFalse();

        tick();
        expect(component.paginatedMovies).toEqual(new PaginatedMovieDto());
        expect(component.isLoading).toBeFalse();
    }));

    it('getFilteresMovies should call getMovies with correct filters', () => {
        const spy = spyOn(component, 'getMovies');
        component.filter.winner = true;
        component.filter.year = 2020;

        component.getFilteresMovies();

        expect(spy).toHaveBeenCalledWith({
            page: 1,
            size: 10,
            winner: true,
            year: 2020,
        });
    });

    describe('getPageNumbers', () => {
        it('should return correct page numbers', () => {
            component.paginatedMovies.totalPages = 10;
            component.paginatedMovies.number = 5;

            const pages = component.getPageNumbers();
            expect(pages.length).toBeGreaterThan(0);
            expect(pages).toContain(5);
        });

        it('should handle zero totalPages', () => {
            component.paginatedMovies.totalPages = 0;
            component.paginatedMovies.number = 0;

            const pages = component.getPageNumbers();
            expect(pages).toEqual([]);
        });
    });

    describe('goToPage', () => {
        it('should update page and call getMovies if page is different', () => {
            const spy = spyOn(component, 'getMovies');
            component.filter.page = 1;
            component.goToPage(2);

            expect(component.filter.page).toBe(2);
            expect(spy).toHaveBeenCalledWith(component.filter);
        });

        it('should do nothing if page is the same', () => {
            const spy = spyOn(component, 'getMovies');
            component.filter.page = 2;
            component.goToPage(2);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('previousPage', () => {
        it('should decrease page and call getMovies if page > 1', () => {
            const spy = spyOn(component, 'getMovies');
            component.filter.page = 3;
            component.previousPage();

            expect(component.filter.page).toBe(2);
            expect(spy).toHaveBeenCalledWith(component.filter);
        });

        it('should not go below page 1', () => {
            const spy = spyOn(component, 'getMovies');
            component.filter.page = 1;
            component.previousPage();

            expect(component.filter.page).toBe(1);
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('nextPage', () => {
        it('should increase page and call getMovies if next page < totalPages', () => {
            const spy = spyOn(component, 'getMovies');
            component.filter.page = 1;
            component.paginatedMovies.totalPages = 3;

            component.nextPage();

            expect(component.filter.page).toBe(2);
            expect(spy).toHaveBeenCalled();
        });

        it('should not increase page if next page >= totalPages', () => {
            const spy = spyOn(component, 'getMovies');
            component.filter.page = 2;
            component.paginatedMovies.totalPages = 3;

            component.nextPage(); // next page = 3 (equal to totalPages)
            expect(component.filter.page).toBe(2);
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('haveNextPage', () => {
        it('should return false if current page + 1 >= totalPages', () => {
            component.paginatedMovies.number = 1;
            component.paginatedMovies.totalPages = 3;
            expect(component.haveNextPage()).toBeFalse();

            component.paginatedMovies.number = 2;
            component.paginatedMovies.totalPages = 3;
            expect(component.haveNextPage()).toBeTrue();
        });
    });

    describe('havePreviousPage', () => {
        it('should return true if current page number is 0', () => {
            component.paginatedMovies.number = 0;
            expect(component.havePreviousPage()).toBeTrue();

            component.paginatedMovies.number = 1;
            expect(component.havePreviousPage()).toBeFalse();
        });
    });
});
