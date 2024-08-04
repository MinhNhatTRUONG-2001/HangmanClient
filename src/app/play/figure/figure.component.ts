import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-figure',
  standalone: true,
  imports: [],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.css'
})
export class FigureComponent {
  @Input() lives!: number
}
