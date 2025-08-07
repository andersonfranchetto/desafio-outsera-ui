import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from '@lib/services';
import { DEFAULT_BASE_THEME } from '@lib/constants';

describe('ThemeService', () => {
    let service: ThemeService;
    let document: Document;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const matchMediaMock = (() => {
        let listener: ((e: MediaQueryListEvent) => void) | null = null;

        const mediaQueryList = {
            matches: false,
            addListener: (cb: (e: MediaQueryListEvent) => void): void => {
                listener = cb;
            },
            removeListener: (): void => {
                listener = null;
            },
            triggerChange: (): void => {
                if (listener) {
                    listener({ matches: true } as MediaQueryListEvent);
                }
            },
        };

        return {
            object: mediaQueryList,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            trigger: () => mediaQueryList.triggerChange(),
        };
    })();

    beforeEach(() => {
        TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });

        spyOn(window, 'matchMedia').and.returnValue(matchMediaMock.object as unknown as MediaQueryList);

        service = TestBed.inject(ThemeService);
        document = TestBed.inject(DOCUMENT);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set theme and subscribe to media changes on init()', () => {
        const setThemeSpy = spyOn(service, 'setTheme').and.callThrough();

        service.setTheme('system');
        service['init']();
        expect(setThemeSpy).toHaveBeenCalledWith(DEFAULT_BASE_THEME);
    });

    it('should set system theme as current theme', () => {
        service.setTheme('system');
        expect(service.currentTheme).toBe('system');
    });

    it('should set system theme as a document.body class', () => {
        service.setTheme('system');
        const bodyClasses = document.body.classList;
        expect(bodyClasses.contains(service.systemTheme)).toBeTruthy();
    });

    it('should set light theme as current theme', () => {
        service.setTheme('light');
        expect(service.currentTheme).toBe('light');
    });

    it('should set light theme as a document.body class', () => {
        service.setTheme('light');
        const bodyClasses = document.body.classList;
        expect(bodyClasses.contains('light')).toBeTruthy();
    });

    it('should set dark theme as current theme', () => {
        service.setTheme('dark');
        expect(service.currentTheme).toBe('dark');
    });

    it('should set dark theme as a document.body class', () => {
        service.setTheme('dark');
        const bodyClasses = document.body.classList;
        expect(bodyClasses.contains('dark')).toBeTruthy();
    });

    it('should react to system theme change if current theme is system', () => {
        const setThemeSpy = spyOn(service as any, 'setTheme');

        // Força o tema salvo como 'system'
        Object.defineProperty(service, '_storedTheme', {
            get: () => 'system',
        });

        service['init']();

        matchMediaMock.trigger();

        expect(setThemeSpy).toHaveBeenCalledWith('system');
    });
});
