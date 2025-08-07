import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Movies',
        loadComponent: async () => (await import('./movie.component')).MovieComponent,
    },
];
