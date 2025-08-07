import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { PaginatedMovieDto } from 'src/app/api/dtos/paginated-movie.dto';
import { MovieService } from 'src/app/api/movie.service';

interface Filters {
    page: number;
    size: number;
    year?: number;
    winner?: boolean;
}

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit {
    isLoading: boolean | undefined = false;

    filter: Filters;

    paginatedMovies: PaginatedMovieDto = new PaginatedMovieDto();

    constructor(private readonly movieService: MovieService) {
        this.filter = {
            page: 1,
            size: 10,
            year: undefined,
            winner: undefined,
        };
    }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(filterWithDefaults?: Filters): void {
        this.isLoading = true;

        filterWithDefaults ??= {
            page: this.filter.page ?? 0,
            size: this.filter.size ?? 10,
            winner: this.filter.winner,
            year: this.filter.year,
        };

        this.movieService
            .getMovies(filterWithDefaults)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (response: PaginatedMovieDto) => {
                    this.paginatedMovies = response;
                },
                error: (error) => {
                    console.error('Erro ao buscar os estúdios vencedores:', error);
                    this.paginatedMovies = new PaginatedMovieDto();
                },
            });
    }
    getFilteresMovies(): void {
        const filterWithDefaults = {
            page: 1,
            size: 10,
            winner: this.filter.winner,
            year: this.filter.year,
        };

        this.getMovies(filterWithDefaults);
    }
    getPageNumbers(): number[] {
        const total = this.paginatedMovies?.totalPages || 0;
        const current = this.paginatedMovies?.number || 0;
        const maxDisplayed = 5;

        const pages: number[] = [];

        const start = Math.max(0, current - Math.floor(maxDisplayed / 2));
        const end = Math.min(total, start + maxDisplayed);

        for (let i = start; i < end; i++) {
            pages.push(i);
        }

        return pages;
    }

    goToPage(page: number): void {
        if (page !== this.filter.page) {
            this.filter.page = page;
            this.getMovies(this.filter);
        }
    }

    previousPage(): void {
        if (this.filter.page && this.filter.page > 1) {
            this.filter.page--;
            this.getMovies(this.filter);
        }
    }

    nextPage(): void {
        if (
            this.paginatedMovies &&
            this.filter.page !== undefined &&
            this.filter.page + 1 < this.paginatedMovies.totalPages
        ) {
            this.filter.page++;
            this.getMovies();
        }
    }

    haveNextPage(): boolean {
        return this.paginatedMovies?.number + 1 >= this.paginatedMovies?.totalPages;
    }

    havePreviousPage(): boolean {
        return this.paginatedMovies?.number === 0;
    }
}
