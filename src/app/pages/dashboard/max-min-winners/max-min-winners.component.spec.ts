import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MaxMinWinnersComponent } from './max-min-winners.component';
import { DashboardService } from 'src/app/api/dashboard.service';
import { MessageService } from '@lib/services/message.service';
import { MaxMinWinnersDto } from 'src/app/api/dtos/list/max-min-wins.dto';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Time between wins (max and min) [MaxMinWinnersComponent]', () => {
    let component: MaxMinWinnersComponent;
    let fixture: ComponentFixture<MaxMinWinnersComponent>;
    let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getMaxMinWinIntervalForProducers']);
        messageServiceSpy = jasmine.createSpyObj('MessageService', ['error']);

        await TestBed.configureTestingModule({
            imports: [MaxMinWinnersComponent, HttpClientTestingModule],
            providers: [
                { provide: DashboardService, useValue: dashboardServiceSpy },
                { provide: MessageService, useValue: messageServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MaxMinWinnersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call showmaxMinWinners on ngOnInit', () => {
        const spy = spyOn(component, 'showmaxMinWinners');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should set maxMinWinners on successful response', fakeAsync(() => {
        const mockResponse: MaxMinWinnersDto = {
            min: [{ producer: 'A', interval: 1, previousWin: 2000, followingWin: 2001 }],
            max: [{ producer: 'B', interval: 10, previousWin: 1990, followingWin: 2000 }],
        };
        dashboardServiceSpy.getMaxMinWinIntervalForProducers.and.returnValue(of(mockResponse));

        component.showmaxMinWinners();
        tick();

        expect(component.maxMinWinners).toEqual(mockResponse);
    }));

    it('should show error on service failure', fakeAsync(() => {
        dashboardServiceSpy.getMaxMinWinIntervalForProducers.and.returnValue(throwError(new Error('fail')));

        component.showmaxMinWinners();
        tick();

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(messageServiceSpy.error).toHaveBeenCalledWith(
            'Erro ao buscar os produtores com maior e menor intervalo entre vitórias!',
            'error',
        );
    }));

    it('should format interval string correctly (plural)', () => {
        const result = component.getIntervalInYears(5);
        expect(result).toBe('5 Anos');
    });

    it('should format interval string correctly (singular)', () => {
        const result = component.getIntervalInYears(1);
        expect(result).toBe('1 Ano');
    });
});
