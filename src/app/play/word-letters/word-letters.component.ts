import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-word-letters',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule],
  templateUrl: './word-letters.component.html',
  styleUrl: './word-letters.component.css'
})
export class WordLettersComponent implements OnChanges {
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  @Input() word!: string
  blanks!: string
  gameStatus: string = ''
  hiddenNextRoundButton: boolean = true

  ngOnChanges(changes: SimpleChanges) {
    if (changes['words'] || this.word) {
      this.blanks = this.generateBlanks(this.word)
      console.log(this.word)
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
          this.gameStatus = 'Congratulation! You solved the word.'
          this.hiddenNextRoundButton = false
        }
    } else {
      this.gameStatus = 'Incorrect!'
    }
  }

  nextRound() {
    console.log('Next round button clicked')
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
}
