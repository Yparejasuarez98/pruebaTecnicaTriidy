import { Routes } from '@angular/router';
import { ListCharactersComponent } from './list-characters/list-characters.component';
import { DetailCharacterComponent } from './detail-character/detail-character.component';
import { FavoriteCharactersComponent } from './favorite-characters/favorite-characters.component';

export const COMPONENTS_ROUTES: Routes = [
    {
        path: 'dashboard', 
        component: ListCharactersComponent
    },
    {
        path: 'detail-character/:id',
        component: DetailCharacterComponent
    },
    {
        path: 'favorites',
        component: FavoriteCharactersComponent
    }
];
