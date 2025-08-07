export class MovieDto {
    id!: number;
    year!: number;
    title!: string;
    studios!: string[];
    producers!: string[];
    winner!: boolean;
}

export class SortDto {
    sorted!: boolean;
    unsorted!: boolean;
    empty!: boolean;
}

export class PageableDto {
    pageNumber!: number;
    pageSize!: number;
    offset!: number;
    paged!: boolean;
    unpaged!: boolean;
    sort!: SortDto;
}

export class PaginatedMovieDto {
    content!: MovieDto[];
    pageable!: PageableDto;
    totalPages!: number;
    totalElements!: number;
    last!: boolean;
    numberOfElements!: number;
    size!: number;
    number!: number;
    sort!: SortDto;
    first!: boolean;
    empty!: boolean;

    constructor() {
        this.content = [];
        this.pageable = new PageableDto();
        this.totalPages = 0;
        this.totalElements = 0;
        this.last = true;
        this.numberOfElements = 0;
        this.size = 0;
        this.number = 0;
        this.sort = new SortDto();
        this.first = true;
        this.empty = true;
    }
}
