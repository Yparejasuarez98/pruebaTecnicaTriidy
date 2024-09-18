import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListCharacterService } from './services/list-character.service';
import { Character } from './models/character';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyCardComponent } from '../../../../../../libs/shared-lib/src/lib/my-card/my-card.component'
const IMPORTS = [CommonModule, MatCardModule, MatButtonModule, NgxPaginationModule, MatIconModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatTooltipModule,
  MyCardComponent
];

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [IMPORTS],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css',
})
export class ListCharactersComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  listCharacters: Character[] = [];
  listCharacterPagination: Character[] = [];
  page: number = 1;
  totalCharacters: number = 0;
  formFilter: FormGroup;

  constructor(private listCharacterService: ListCharacterService, private fb: FormBuilder, private route: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.listCharacter(this.page);
  }

  createForm(): void {
    this.formFilter = this.fb.group({
      name: '',
      status: '',
      species: '',
      gender: ''
    });
  }

  listCharacter(page: number): void {
    this.listCharacterService.listCharacters(page, this.formFilter.value).subscribe({
      next: (characters) => {
        this.listCharacters = characters.results;
        this.totalCharacters = characters.info.count;
      }, error: (err) => {
        this._snackBar.open(err.error.error, '', {
          duration: 2000,
        });
      }
    });
  }

  filterCharacters(): void {
    this.listCharacter(this.page);
  }

  selectFavorite(character: Character): void {
    this.listCharacterService.addFavorite(character);
  }

  changeFavorite(character: Character): void {
    if (this.listCharacterService.isFavorite(character)) {
      this.listCharacterService.deleteFavorite(character.id);
      this._snackBar.open('Delete favorite character', '', {
        duration: 2000
      });
    } else {
      this.listCharacterService.addFavorite(character);
      this._snackBar.open('Favorite character', '', {
        duration: 2000
      });
    }
  }

  isFavorite(character: Character): boolean {
    return this.listCharacterService.isFavorite(character);
  }

  resetForm(): void {
    this.formFilter.reset();
    this.listCharacter(this.page);
  }

  // detail(character: Character) {
  //   this.route.navigate([`/detail-character/${character.id}`]);
  // }

  get name(): AbstractControl | null { return this.formFilter.get('name') }
  get status(): AbstractControl | null { return this.formFilter.get('status') }
  get species(): AbstractControl | null { return this.formFilter.get('species') }
  get gender(): AbstractControl | null { return this.formFilter.get('gender') }
}
