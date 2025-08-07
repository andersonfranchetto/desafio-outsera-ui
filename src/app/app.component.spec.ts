import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ThemeService } from '@lib/services';

const themeServiceSpy = {
    currentTheme$: new BehaviorSubject('light'),
    init: jasmine.createSpy('init'),
};

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: {}, queryParams: {} },
                        params: of({}),
                        queryParams: of({}),
                    },
                },
            ],
        }).compileComponents();

        // Override provider depois de compileComponents
        TestBed.overrideProvider(ThemeService, { useValue: themeServiceSpy });
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should call themeService.init on ngOnInit', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(themeServiceSpy.init).toHaveBeenCalled();
    });
});
