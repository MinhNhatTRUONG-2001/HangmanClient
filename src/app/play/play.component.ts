import { Component } from '@angular/core';
import { FigureComponent } from './figure/figure.component';
import { RoundInfoComponent } from './round-info/round-info.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [MatGridListModule, FigureComponent, RoundInfoComponent, WordLettersComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  currentRound: number = 1
  incorrectGuessesPerRound: number[] = []
  startDatetime: Date = new Date()
  endDatetime: Date = new Date()
}
