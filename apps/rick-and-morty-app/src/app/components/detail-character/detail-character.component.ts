import { AfterContentInit, AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCharacterService } from '../list-characters/services/list-character.service';
import { Character } from '../list-characters/models/character';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MyCardComponent } from 'libs/shared-lib/src/lib/my-card/my-card.component';

@Component({
  selector: 'app-detail-character',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MyCardComponent],
  templateUrl: './detail-character.component.html',
  styleUrl: './detail-character.component.css',
})
export class DetailCharacterComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  id: number = 0;
  character: Character = {} as Character;
  constructor(private route: ActivatedRoute, private router: Router, private listCharacterService: ListCharacterService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id')!);
    });
    this.getCharacterById();
  }

  getCharacterById(): void {
    this.listCharacterService.characterById(this.id).subscribe({
      next: character => {
        this.character = character;
      }, error: (err) => {
        this._snackBar.open(err.error.error, '', {
          duration: 2000,
        });
      }
    });
  }

  returnDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
