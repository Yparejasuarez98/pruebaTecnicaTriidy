import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./components/components.routes').then(c => c.COMPONENTS_ROUTES)
    }
];
