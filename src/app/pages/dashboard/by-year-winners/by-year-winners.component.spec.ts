import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MessageService } from '@lib/services/message.service';
import { of, throwError } from 'rxjs';
import { DashboardService } from 'src/app/api/dashboard.service';
import { ByYeaWinDto } from 'src/app/api/dtos/by-year-win.dto';
import { ByYearWinnersComponent } from './by-year-winners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Years with more than one winner [ByYearWinnersComponent]', () => {
    let component: ByYearWinnersComponent;
    let fixture: ComponentFixture<ByYearWinnersComponent>;
    let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getWinnersByYear']);
        messageServiceSpy = jasmine.createSpyObj('MessageService', ['error']);

        await TestBed.configureTestingModule({
            imports: [ByYearWinnersComponent, HttpClientTestingModule],
            providers: [
                { provide: DashboardService, useValue: dashboardServiceSpy },
                { provide: MessageService, useValue: messageServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ByYearWinnersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize yearsAvailable on ngOnInit', () => {
        component.ngOnInit();
        expect(component.yearsAvailable.length).toBeGreaterThan(0);
        expect(component.yearsAvailable[0]).toBe(new Date().getFullYear());
    });

    it('should call showByYearWinners if searchYear is valid', () => {
        const showByYearWinnersSpy = spyOn(component, 'showByYearWinners');
        component.searchYear = 2020;
        component.searchByYear();
        expect(showByYearWinnersSpy).toHaveBeenCalledWith(2020);
    });

    it('should call messageService.error if searchYear is null', () => {
        component.searchYear = null;
        component.searchByYear();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(messageServiceSpy.error).toHaveBeenCalledWith(
            'Ano de pesquisa não foi informado. Selecione!',
            'Vencedores por ano',
        );
    });

    it('should set byYearWinners on success from service', fakeAsync(() => {
        const mockData: ByYeaWinDto[] = [
            {
                id: 1,
                producers: ['Producer a'],
                studios: ['Studio A'],
                title: 'Title',
                winner: false,
                year: 1990,
            },
        ];
        dashboardServiceSpy.getWinnersByYear.and.returnValue(of(mockData));
        component.showByYearWinners(2022);

        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.byYearWinners).toEqual(mockData);
    }));

    it('should show error and clear winners on service failure', fakeAsync(() => {
        dashboardServiceSpy.getWinnersByYear.and.returnValue(throwError(() => new Error('fail')));

        component.showByYearWinners(2022);
        tick();

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(messageServiceSpy.error).toHaveBeenCalledWith(
            'Erro ao buscar os estúdios vencedores por ano!',
            'Vencedores por ano',
        );
        expect(component.byYearWinners).toEqual([]);
        expect(component.isLoading).toBeFalse();
    }));
});
