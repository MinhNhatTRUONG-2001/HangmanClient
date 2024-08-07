import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { maxLives } from '../play.component';
import { Router } from '@angular/router';
import { serverUrl } from '../../server';

@Component({
  selector: 'app-word-letters',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './word-letters.component.html',
  styleUrl: './word-letters.component.css'
})
export class WordLettersComponent implements OnChanges {
  @Input() totalWords!: number
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  @Input() word!: string
  blanks!: string
  gameStatus: string = ''
  errorMessage: string = ''
  hiddenNextRoundButton: boolean = true
  hiddenResultSubmission: boolean = true
  @Output() decreaseLivesEvent = new EventEmitter()
  @Output() nextRoundEvent = new EventEmitter()
  @Input() lives!: number
  @Input() round!: number
  incorrectGuessesPerWord: number[] = []
  @Input() startDatetime!: Date
  endDatetime!: Date

  constructor(private elRef: ElementRef<HTMLElement>, private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['word'] && changes['word'].currentValue !== changes['word'].previousValue) {
      this.blanks = this.generateBlanks(this.word)
      //console.log(this.word)
    }
  }

  checkLetter(event: any, letter: string) {
    //Disable the chosen letter
    const letterButton = event.currentTarget
    letterButton.disabled = true
    letterButton.style.backgroundColor = 'gray'

    //Check if the letter is correct and update the blanks and the game status
    let countCorrectLetters = 0
    this.word.split('').forEach((w: string, i: number) => {
      if (w === letter) {
        countCorrectLetters++
        this.blanks = this.blanks.slice(0, i) + letter + this.blanks.slice(i + 1)
      }
    })
    if (countCorrectLetters > 0) {
      this.gameStatus = (countCorrectLetters == 1) ? `Correct! There is 1 letter ${letter}.` : `Correct! There are ${countCorrectLetters} letters ${letter}.`

      if (this.blanks === this.word) {
        if (this.round === this.totalWords) {
          this.gameStatus = 'Congratulation! You solved all words. Please write your name below to save your result:'
          this.hiddenResultSubmission = false
          this.handleLetterButtonsAfterRound('disable')
        }
        else {
          this.gameStatus = 'Good job! You solved the word.'
          this.hiddenNextRoundButton = false
          this.incorrectGuessesPerWord.push(maxLives - this.lives)
          this.handleLetterButtonsAfterRound('disable')
        }
      }
    } else {
      this.gameStatus = 'Incorrect!'
      this.decreaseLivesEvent.emit()
      this.lives--

      if (this.lives === 0) {
        this.endDatetime = new Date()
        this.gameStatus = 'Game over! Please write your name below to save your result:'
        this.hiddenResultSubmission = false
        this.handleLetterButtonsAfterRound('disable')
      }
    }
  }

  nextRound() {
    this.gameStatus = ''
    this.hiddenNextRoundButton = true
    this.handleLetterButtonsAfterRound('enable')
    this.nextRoundEvent.emit()
  }

  submitResult(event: any) {
    const submitButton = event.currentTarget
    submitButton.disabled = true
    submitButton.style.backgroundColor = 'gray'

    const nameInputElement = this.elRef.nativeElement.querySelector('#name')
    const nameInput = nameInputElement as HTMLInputElement
    const requestBody = {
      playerName: nameInput.value,
      correctWords: this.round - 1,
      incorrectGuessesPerWord: [...this.incorrectGuessesPerWord, maxLives], // or maxLives - this.lives where this.lives = 0
      startDatetime: this.startDatetime,
      endDatetime: this.endDatetime
    }
    console.log(requestBody)
    fetch(`${serverUrl}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => {
      if (!res.ok) {
        res.json().then(data => {
          this.errorMessage = data.message
          submitButton.disabled = false
          submitButton.style.backgroundColor = '#AA77FF' //light violet
        })
      }
      else {
        this.router.navigate([''])
      }
    })
    .catch(error => console.log(error))
  }

  generateBlanks(word: string) {
    let blanks = ''
    for (const w of word.split('')) {
      if (this.letters.includes(w.toUpperCase())) {
        blanks += '_'
      }
      else {
        blanks += w
      }
    }
    return blanks
  }

  handleLetterButtonsAfterRound(action: 'enable' | 'disable') {
    const elements = this.elRef.nativeElement.querySelectorAll('button.secondary')
    elements.forEach(e => {
      const button = e as HTMLButtonElement
      button.disabled = action === 'disable' ? true : false
      button.style.backgroundColor = action === 'disable' ? 'gray' : '#AA77FF' //light violet
    })
  }
}
