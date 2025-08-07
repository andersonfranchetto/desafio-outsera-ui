import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-theme',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
    currentTheme!: AppTheme | null;

    private readonly _themeService = inject(ThemeService);

    private readonly _destroy$ = new Subject();

    ngOnInit(): void {
        this._themeService.currentTheme$
            .pipe(takeUntil(this._destroy$))
            .subscribe((theme) => (this.currentTheme = theme));
    }

    ngOnDestroy(): void {
        this._destroy$.complete();
    }

    handleThemeChange(theme: AppTheme): void {
        this._themeService.setTheme(theme);
    }
}
