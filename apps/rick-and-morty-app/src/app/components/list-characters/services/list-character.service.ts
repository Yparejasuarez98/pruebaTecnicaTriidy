import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/rick-and-morty-app/src/environments/environment.development';
import { Character } from '../models/character';
import { Observable } from 'rxjs';
import { ResponseCharacter } from '../../../shared/models/response';

const ENDPOINT = `${environment.url}`;

@Injectable({
  providedIn: 'root'
})
export class ListCharacterService {

  constructor(private httpClient: HttpClient) { }

  listCharacters(page: number, characters?: Character): Observable<ResponseCharacter> {
    const filterName = `${characters?.name ? `&name=${characters?.name}` : ''}`;
    const filterStatus = `${characters?.status ? `&status=${characters?.status}` : ''}`;
    const filterSpecies = `${characters?.species ? `&species=${characters?.species}` : ''}`;
    const filterGender = `${characters?.gender ? `&gender=${characters?.gender}` : ''}`;
    return this.httpClient.get<ResponseCharacter>(`${ENDPOINT}/character?page=${page}${filterName}${filterStatus}${filterSpecies}${filterGender}`);
  }

  characterById(id: number) {
    return this.httpClient.get<Character>(`${ENDPOINT}/character/${id}`)
  }

  getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(character: Character) {
    const favorites = this.getFavorites();
    if (!favorites.some((fav: Character) => fav.id === character.id)) {
      favorites.push(character);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  deleteFavorite(id: number) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav: Character) => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorite(character: Character): boolean {
    const favorites = this.getFavorites();
    return favorites.some((fav: Character) => fav.id === character.id);
  }

}
