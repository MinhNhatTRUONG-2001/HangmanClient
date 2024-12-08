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
  screenOrientation: string = screen.orientation.type
  windowWidth: number = window.innerWidth
  gridRowHeight: string = "10:9"

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any): void {
    $event.preventDefault()
    $event.returnValue = 'Are you sure you want to quit? Your progress will not be saved.'
  }
  @HostListener('window:orientationchange')
  onOrientationChange() {
    this.screenOrientation = screen.orientation.type
  }

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth
    if (window.innerWidth >= 1200 && window.innerWidth > window.innerHeight) {
      this.screenOrientation = "landscape-primary"
      this.gridRowHeight = "10:9"
    }
    else if (window.innerWidth >= 992 && window.innerWidth < 1200 && window.innerWidth > window.innerHeight) {
      this.screenOrientation = "landscape-primary"
      this.gridRowHeight = "10:12"
    }
    else if (window.innerWidth >= 768 && window.innerWidth < 992 && window.innerWidth > window.innerHeight) {
      this.screenOrientation = "landscape-primary"
      this.gridRowHeight = "10:16"
    }
    else {
      this.screenOrientation = "portrait-primary"
    }
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

    if (window.innerWidth >= 1200 && window.innerWidth > window.innerHeight) {
      this.screenOrientation = "landscape-primary"
      this.gridRowHeight = "10:9"
    }
    else if (window.innerWidth >= 992 && window.innerWidth < 1200 && window.innerWidth > window.innerHeight) {
      this.screenOrientation = "landscape-primary"
      this.gridRowHeight = "10:12"
    }
    else if (window.innerWidth >= 768 && window.innerWidth < 992 && window.innerWidth > window.innerHeight) {
      this.screenOrientation = "landscape-primary"
      this.gridRowHeight = "10:16"
    }
    else {
      this.screenOrientation = "portrait-primary"
    }
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
