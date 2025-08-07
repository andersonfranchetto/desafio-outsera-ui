import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StudiosWinnersComponent } from './studios-winners.component';
import { DashboardService } from 'src/app/api/dashboard.service';
import { StudioWinDto } from 'src/app/api/dtos/studio-win.dto';
import { StudiosWinnersDto } from 'src/app/api/dtos/list/studio-wins.dto';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Studios with the Most Wins [3+] [StudiosWinnersComponent]', () => {
    let component: StudiosWinnersComponent;
    let fixture: ComponentFixture<StudiosWinnersComponent>;
    let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;

    beforeEach(async () => {
        dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getStudiosWinners']);

        await TestBed.configureTestingModule({
            imports: [StudiosWinnersComponent, HttpClientTestingModule],
            providers: [{ provide: DashboardService, useValue: dashboardServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(StudiosWinnersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call showWinners on ngOnInit', () => {
        const spy = spyOn(component, 'showWinners');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should set sorted and sliced studiosWinners on success (unordered input)', fakeAsync(() => {
        const unorderedStudios: StudioWinDto[] = [
            { name: 'Studio A', winCount: 1 },
            { name: 'Studio B', winCount: 5 },
            { name: 'Studio C', winCount: 3 },
            { name: 'Studio D', winCount: 2 },
        ];

        const response: StudiosWinnersDto = { studios: unorderedStudios };
        dashboardServiceSpy.getStudiosWinners.and.returnValue(of(response));

        component.showWinners();
        tick();

        expect(component.studiosWinners.studios.length).toBe(3);
        expect(component.studiosWinners.studios[0].winCount).toBeGreaterThanOrEqual(
            component.studiosWinners.studios[1].winCount,
        );
        expect(component.studiosWinners.studios[1].winCount).toBeGreaterThanOrEqual(
            component.studiosWinners.studios[2].winCount,
        );
    }));

    it('should not re-sort studios if already sorted in descending order', fakeAsync(() => {
        const sortedStudios: StudioWinDto[] = [
            { name: 'Studio B', winCount: 6 },
            { name: 'Studio A', winCount: 4 },
            { name: 'Studio C', winCount: 2 },
        ];

        const response: StudiosWinnersDto = { studios: [...sortedStudios] };
        dashboardServiceSpy.getStudiosWinners.and.returnValue(of(response));

        component.showWinners();
        tick();

        expect(component.studiosWinners.studios).toEqual(sortedStudios.slice(0, 3));
    }));

    it('should handle service error with console.error', fakeAsync(() => {
        spyOn(console, 'error'); // espiona console
        dashboardServiceSpy.getStudiosWinners.and.returnValue(throwError(new Error('fail')));

        component.showWinners();
        tick();

        expect(console.error).toHaveBeenCalledWith('Erro ao buscar os 3+ estúdios vencedores:', jasmine.any(Error));
    }));

    it('should correctly identify sorted descending array', () => {
        const sorted: StudioWinDto[] = [
            { name: 'A', winCount: 4 },
            { name: 'B', winCount: 3 },
            { name: 'C', winCount: 1 },
        ];
        expect(component.isSortedDescendingByWinCount(sorted)).toBeTrue();
    });

    it('should detect unsorted array', () => {
        const unsorted: StudioWinDto[] = [
            { name: 'A', winCount: 2 },
            { name: 'B', winCount: 5 },
            { name: 'C', winCount: 3 },
        ];
        expect(component.isSortedDescendingByWinCount(unsorted)).toBeFalse();
    });
});
