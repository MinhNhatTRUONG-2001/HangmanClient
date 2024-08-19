import { Component, HostListener } from '@angular/core';
import { FigureComponent } from './figure/figure.component';
import { RoundInfoComponent } from './round-info/round-info.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { Word } from './word';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';

export const maxLives = 6

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [MatGridListModule, FigureComponent, RoundInfoComponent, WordLettersComponent, CommonModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
  wordList: Word[] = []
  totalWords: number = -1
  solvedWordList: Word[] = []
  currentWord!: Word
  lives: number = maxLives
  currentRound: number = 1
  startDatetime: Date = new Date()
  isLoading: boolean = true

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any): void {
    $event.preventDefault()
    $event.returnValue = 'Are you sure you want to quit? Your progress will not be saved.'
  }

  constructor() {
    fetch(`${environment.serverUrl}/word/all`)
    .then(res => res.text())
    .then(data => {
      const bytes = CryptoJS.AES.decrypt(data, environment.cryptoSecretKey)
      const stringifiedWordList = bytes.toString(CryptoJS.enc.Utf8)
      this.wordList = JSON.parse(stringifiedWordList)
      this.totalWords = this.wordList.length
      this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)]
      this.wordList = this.wordList.filter(w => w !== this.currentWord)
      this.isLoading = false
    })
    .catch(e => {
      console.log(e)
      this.isLoading = false
    })
  }

  decreaseLives() {
    this.lives--
  }

  nextRound() {
    this.lives = maxLives
    this.currentRound++
    this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)]
    this.wordList = this.wordList.filter(w => w !== this.currentWord)
    //console.log(this.wordList.length)
    //console.log(this.solvedWordList.length)
  }
}
