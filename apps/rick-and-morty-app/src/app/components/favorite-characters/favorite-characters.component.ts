import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Character } from '../list-characters/models/character';
import { ListCharacterService } from '../list-characters/services/list-character.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-favorite-characters',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule
  ],
  templateUrl: './favorite-characters.component.html',
  styleUrl: './favorite-characters.component.css',
})
export class FavoriteCharactersComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['name', 'species', 'status', 'origin', 'location', 'action'];
  dataSource = new MatTableDataSource<Character>([]);
  totalItems: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private listCharacterService: ListCharacterService) {}

  ngOnInit(): void {
    this.getFavoritesCharacter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getFavoritesCharacter() {
    const favorites = this.listCharacterService.getFavorites();
    this.dataSource.data = favorites;
    this.totalItems = favorites.length;
    this.dataSource.paginator = this.paginator;
  }

  deleteFavorite(character: Character) {
    this.listCharacterService.deleteFavorite(character.id);
    this.getFavoritesCharacter();
  }
}
