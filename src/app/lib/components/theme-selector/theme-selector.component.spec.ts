import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSelectorComponent } from './theme-selector.component';
import { ThemeService } from '@lib/services/theme';
import { AppTheme } from '@lib/services/theme/theme.config';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('ThemeSelectorComponent', () => {
    let component: ThemeSelectorComponent;
    let fixture: ComponentFixture<ThemeSelectorComponent>;
    let themeServiceMock: jasmine.SpyObj<ThemeService>;
    const mockTheme$ = new BehaviorSubject<AppTheme | null>('light');

    beforeEach(async () => {
        themeServiceMock = jasmine.createSpyObj<ThemeService>('ThemeService', ['setTheme'], {
            currentTheme$: mockTheme$,
        });

        await TestBed.configureTestingModule({
            imports: [ThemeSelectorComponent, CommonModule, RouterModule],
            providers: [{ provide: ThemeService, useValue: themeServiceMock }],
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeSelectorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to theme on init', () => {
        fixture.detectChanges(); // triggers ngOnInit
        expect(component.currentTheme).toBe('light');

        mockTheme$.next('dark');
        expect(component.currentTheme).toBe('dark');
    });

    it('should call ThemeService.setTheme on handleThemeChange', () => {
        const newTheme: AppTheme = 'dark';
        component.handleThemeChange(newTheme);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(themeServiceMock.setTheme).toHaveBeenCalledWith(newTheme);
    });

    it('should unsubscribe on destroy', () => {
        fixture.detectChanges();

        const destroySpy = spyOn(component['_destroy$'], 'complete').and.callThrough();
        component.ngOnDestroy();

        expect(destroySpy).toHaveBeenCalled();
    });

    it('should call ThemeService.setTheme on handleThemeChange', () => {
        const newTheme: AppTheme = 'dark';

        component.handleThemeChange(newTheme);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(themeServiceMock.setTheme).toHaveBeenCalledWith(newTheme);
    });
});
