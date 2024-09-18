import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-my-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-card.component.html',
  styleUrl: './my-card.component.css',
})
export class MyCardComponent {

  @Input() urlImage: string;
  @Input() data: any;
  @Input() showButtonDetail: boolean;
  @Input() urlRedirectDetail: string;

  constructor(private route: Router) {

  }

  details(data: any) {
    this.route.navigate([`/${this.urlRedirectDetail}/${data.id}`]);
  }
}
