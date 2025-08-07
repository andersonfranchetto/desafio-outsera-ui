import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: async () => (await import('@pages/dashboard')).routes,
    },
    {
        path: 'movies',
        loadChildren: async () => (await import('@pages/movie')).routes,
    },
    {
        path: '**',
        loadComponent: async () => (await import('@pages/screens/not-found/not-found.component')).NotFoundComponent,
    },
];
