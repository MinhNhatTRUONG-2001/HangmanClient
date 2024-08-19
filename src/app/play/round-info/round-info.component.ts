import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round-info',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule],
  templateUrl: './round-info.component.html',
  styleUrl: './round-info.component.css'
})
export class RoundInfoComponent {
  @Input() lives!: number
  @Input() round!: number
  @Input() topic!: string

  constructor(private router: Router) {}

  quitGame() {
    if(confirm('Are you sure you want to quit? Your progress will not be saved.')) {
      this.router.navigateByUrl('')
    }
  }
}
