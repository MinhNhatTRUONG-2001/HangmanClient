import { Component } from '@angular/core';
import { FigureComponent } from './figure/figure.component';
import { RoundInfoComponent } from './round-info/round-info.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { serverUrl } from '../server';
import { Word } from './word';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [MatGridListModule, FigureComponent, RoundInfoComponent, WordLettersComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  wordList: Word[] = []
  totalWords: number = -1
  solvedWordList: Word[] = []
  currentWord!: Word
  lives: number = 6
  currentRound: number = 1
  startDatetime: Date = new Date()

  constructor() {
    fetch(`${serverUrl}/word/all`)
    .then(res => res.json())
    .then(data => {
      this.wordList = data
      this.totalWords = this.wordList.length
      this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)]
      this.wordList = this.wordList.filter(w => w !== this.currentWord)
      //console.log(this.wordList.length)
      //console.log(this.solvedWordList.length)
  })
    .catch(e => console.log(e))
  }

  decreaseLives() {
    this.lives--
  }
}
