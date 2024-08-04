import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-round-info',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './round-info.component.html',
  styleUrl: './round-info.component.css'
})
export class RoundInfoComponent {
  @Input() lives!: number
  @Input() round!: number
  @Input() topic!: string
}
