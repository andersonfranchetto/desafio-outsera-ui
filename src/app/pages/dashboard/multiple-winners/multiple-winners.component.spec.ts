import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MultipleWinnersComponent } from './multiple-winners.component';
import { DashboardService } from 'src/app/api/dashboard.service';
import { MessageService } from '@lib/services/message.service';
import { YearWinnersDto } from 'src/app/api/dtos/list/year-wins.dto';
import { YearWinDto } from 'src/app/api/dtos/year-win.dto';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Years with more than one winner [MultipleWinnersComponent]', () => {
    let component: MultipleWinnersComponent;
    let fixture: ComponentFixture<MultipleWinnersComponent>;
    let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getYearsWithMultipleWinners']);
        messageServiceSpy = jasmine.createSpyObj('MessageService', ['error']);

        await TestBed.configureTestingModule({
            imports: [MultipleWinnersComponent, HttpClientTestingModule],
            providers: [
                { provide: DashboardService, useValue: dashboardServiceSpy },
                { provide: MessageService, useValue: messageServiceSpy }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MultipleWinnersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call showYearsWinners on ngOnInit', () => {
        const spy = spyOn(component, 'showYearsWinners');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should set sorted and sliced yearsWinners on success (unordered input)', fakeAsync(() => {
        const unorderedYears: YearWinDto[] = [
            { year: 2000, winnerCount: 2 },
            { year: 2001, winnerCount: 5 },
            { year: 2002, winnerCount: 3 },
            { year: 2003, winnerCount: 1 },
        ];

        const response: YearWinnersDto = { years: unorderedYears };
        dashboardServiceSpy.getYearsWithMultipleWinners.and.returnValue(of(response));

        component.showYearsWinners();
        tick();

        expect(component.yearsWinners.years.length).toBe(3);
        expect(component.yearsWinners.years[0].winnerCount).toBeGreaterThanOrEqual(
            component.yearsWinners.years[1].winnerCount,
        );
        expect(component.yearsWinners.years[1].winnerCount).toBeGreaterThanOrEqual(
            component.yearsWinners.years[2].winnerCount,
        );
    }));

    it('should not re-sort years if already sorted in descending order', fakeAsync(() => {
        const sortedYears: YearWinDto[] = [
            { year: 2001, winnerCount: 5 },
            { year: 2002, winnerCount: 3 },
            { year: 2003, winnerCount: 1 },
        ];

        const response: YearWinnersDto = { years: [...sortedYears] };
        dashboardServiceSpy.getYearsWithMultipleWinners.and.returnValue(of(response));

        component.showYearsWinners();
        tick();

        expect(component.yearsWinners.years).toEqual(sortedYears.slice(0, 3));
    }));

    it('should handle service error gracefully', fakeAsync(() => {
        dashboardServiceSpy.getYearsWithMultipleWinners.and.returnValue(throwError(new Error('fail')));

        component.showYearsWinners();
        tick();

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(messageServiceSpy.error).toHaveBeenCalledWith(
            'Erro ao buscar os maiores vencedores por ano!',
            'Vencedores por ano',
        );
    }));

    it('should correctly identify sorted descending array', () => {
        const sorted: YearWinDto[] = [
            { year: 2020, winnerCount: 4 },
            { year: 2019, winnerCount: 3 },
            { year: 2018, winnerCount: 1 },
        ];
        expect(component.isSortedDescendingByWinCount(sorted)).toBeTrue();
    });

    it('should detect unsorted array', () => {
        const unsorted: YearWinDto[] = [
            { year: 2020, winnerCount: 2 },
            { year: 2019, winnerCount: 5 },
            { year: 2018, winnerCount: 3 },
        ];
        expect(component.isSortedDescendingByWinCount(unsorted)).toBeFalse();
    });
});
